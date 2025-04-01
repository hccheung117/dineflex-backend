import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { GetRestaurantsDto } from './dto/get-restaurants.dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { v4 as uuid } from 'uuid';
import { User, UserRole } from 'src/auth/user.entity';
import { RestaurantTimeSlot } from './restaurant-time-slot.entity';
import { Weekday } from 'src/common/weekdays.enum';
import { UpdateWeeklyScheduleDto } from './dto/update-weekly-schedule.dto';

const DEFAULT_TIME_SLOTS = [
	'17:00',
	'17:30',
	'18:00',
	'18:30',
	'19:00',
	'19:30',
	'20:00',
	'20:30',
];

const WEEKDAYS: Weekday[] = [
	Weekday.MONDAY,
	Weekday.TUESDAY,
	Weekday.WEDNESDAY,
	Weekday.THURSDAY,
	Weekday.FRIDAY,
	Weekday.SATURDAY,
	Weekday.SUNDAY,
];

@Injectable()
export class RestaurantsService {
	constructor(
		@InjectRepository(Restaurant)
		private readonly restaurantRepo: Repository<Restaurant>,
		@InjectRepository(RestaurantTimeSlot)
		private readonly timeSlotRepo: Repository<RestaurantTimeSlot>,
	) {}

	async findAll(): Promise<Restaurant[]> {
		return this.restaurantRepo.find();
	}

	async findOne(id: string): Promise<Restaurant> {
		const lookup = await this.restaurantRepo.findOne({ where: { id } });
		if (!lookup) throw new NotFoundException(`Restaurant with ID "${id}" is not found.`);
		return lookup;
	}

	async create(restaurantData: Partial<Restaurant>, owner: User): Promise<Restaurant> {
		if (owner.role !== UserRole.RESTAURANT_OWNER) {
			throw new UnauthorizedException('Only restaurant owners can add a restaurant to this app.');
		}
		const newRestaurant = this.restaurantRepo.create({ ...restaurantData, owner });
		const savedRestaurant = await this.restaurantRepo.save(newRestaurant);

		const seedSlotObject = WEEKDAYS.map((day) =>
			this.timeSlotRepo.create({
				restaurant: savedRestaurant,
				dayOfWeek: day,
				timeSlots: DEFAULT_TIME_SLOTS,
			}),
		);

		await this.timeSlotRepo.save(seedSlotObject);
		return savedRestaurant;
	}

	async update(id: string, updateData: Partial<Restaurant>, owner: User): Promise<Restaurant> {
		const restaurantToUpdate = await this.findOne(id);
		if (restaurantToUpdate.owner.id !== owner.id) {
			throw new UnauthorizedException('Only the owner can edit the information of a restaurant.');
		}
		Object.assign(restaurantToUpdate, updateData);
		return this.restaurantRepo.save(restaurantToUpdate);
	}

	async delete(id: string, owner: User): Promise<void> {
		const restaurantToDelete = await this.findOne(id);
		if (restaurantToDelete.owner.id !== owner.id) {
			throw new UnauthorizedException('Only the owner can delete the restaurant from this app.');
		}
		await this.restaurantRepo.delete(id);
	}

	async updateWeeklySchedule(
		restaurantId: string,
		dto: UpdateWeeklyScheduleDto,
		ownerId: number,
	): Promise<void> {
		const restaurant = await this.restaurantRepo.findOne({
			where: { id: restaurantId },
			relations: ['owner'],
		});

		if (!restaurant) throw new NotFoundException('Restaurant is not found.');
		if (restaurant.owner.id !== ownerId) throw new UnauthorizedException();

		const days = Object.keys(dto) as (keyof UpdateWeeklyScheduleDto)[];

		for (const day of days) {
			const newTimeSlots = dto[day];
			if (!newTimeSlots) continue;

			const existingSlotObject = await this.timeSlotRepo.findOne({
				where: { restaurant: { id: restaurantId }, dayOfWeek: day as Weekday },
			});

			if (existingSlotObject) {
				existingSlotObject.timeSlots = newTimeSlots;
				await this.timeSlotRepo.save(existingSlotObject);
			} else {
				const newSlotObject = this.timeSlotRepo.create({
					restaurant,
					dayOfWeek: day as Weekday,
					timeSlots: newTimeSlots,
				});
				await this.timeSlotRepo.save(newSlotObject);
			}
		}
	}

	// async findAll(getRestaurantsDto: GetRestaurantsDto, user: User): Promise<Restaurant[]> {
	// 	const { searchName, location, cuisine, hasEarlyBird, hasLastMinute} = getRestaurantsDto;
	// 	const query = this.restaurantRepo.createQueryBuilder('restaurant');

	// 	if (searchName) {
	// 		query.andWhere('(restaurant.name ILIKE :searchName)', { searchName: `%${searchName}%` });
	// 	}
	// 	if (location) {
	// 		query.andWhere('restaurant.location = :location', { location });
	// 	}
	// 	if (cuisine) {
	// 		query.andWhere('restaurant.cuisine = :cuisine', { cuisine });
	// 	}
	// 	if (hasEarlyBird) {
	// 		query.andWhere('restaurant.hasEarlyBird = :hasEarlyBird', { hasEarlyBird });
	// 	}
	// 	if (hasLastMinute) {
	// 		query.andWhere('restaurant.hasLastMinute = :hasLastMinute', { hasLastMinute });
	// 	}

	// 	return query.getMany();
	// }

	// async findOne(id: string, user: User): Promise<Restaurant> {
	// 	const query = this.restaurantRepo.createQueryBuilder('restaurant');
	// 	query.where('restaurant.id = :id', { id })

	// 	const lookup = await query.getOne();
	// 	if (!lookup) {
	// 		throw new NotFoundException(`Restaurant with ID "${id}" is not found.`);
	// 	}
	// 	return lookup;
	// }

	// async create(createRestaurantDto: CreateRestaurantDto, user: User): Promise<Restaurant> {
	// 	const { name, thumbnailUrl, location, cuisine, hasEarlyBird, hasLastMinute } = createRestaurantDto;

	// 	const newRestaurant = this.restaurantRepo.create({
	// 		id: uuid(),
	// 		name,
	// 		thumbnailUrl,
	// 		location,
	// 		cuisine,
	// 		hasEarlyBird,
	// 		hasLastMinute,
	// 	});

	// 	await this.restaurantRepo.save(newRestaurant);
	// 	return newRestaurant;
	// }

	// async delete(id: string, user: User): Promise<void> {
	// 	const deleteResult = await this.restaurantRepo.delete({ id });

	// 	if (deleteResult.affected === 0) {
	// 		throw new NotFoundException(`Restaurant with ID "${id}" is not found.`);
	// 	}
	// }

	// async update(id: string, updateRestaurantDto: UpdateRestaurantDto, user: User): Promise<Restaurant> {
	// 	const restaurantToUpdate = await this.findOne(id, user);
	// 	const { name, thumbnailUrl, location, cuisine, hasEarlyBird, hasLastMinute } = updateRestaurantDto;

	// 	if (name) {
	// 		restaurantToUpdate.name = updateRestaurantDto.name;
	// 	}
	// 	if (thumbnailUrl) {
	// 		restaurantToUpdate.thumbnailUrl = updateRestaurantDto.thumbnailUrl;
	// 	}
	// 	if (location) {
	// 		restaurantToUpdate.location = updateRestaurantDto.location;
	// 	}
	// 	if (cuisine) {
	// 		restaurantToUpdate.cuisine = updateRestaurantDto.cuisine;
	// 	}
	// 	if (hasEarlyBird) {
	// 		restaurantToUpdate.hasEarlyBird = updateRestaurantDto.hasEarlyBird;
	// 	}
	// 	if (hasLastMinute) {
	// 		restaurantToUpdate.hasLastMinute = updateRestaurantDto.hasLastMinute;
	// 	}

	// 	await this.restaurantRepo.save(restaurantToUpdate);
	// 	return restaurantToUpdate;
	// }
}
