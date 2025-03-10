import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ResumeToken } from 'typeorm';
import { Restaurant, Counties } from './restaurant.entity';
import { GetRestaurantsDto } from './dto/get-restaurants.dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { v4 as uuid } from 'uuid';
import { User, UserRole } from 'src/auth/user.entity';

@Injectable()
export class RestaurantsService {
	constructor(
		@InjectRepository(Restaurant)
		private restaurantRepo: Repository<Restaurant>,
	) {}

	async getRestaurants(getRestaurantsDto: GetRestaurantsDto, user: User): Promise<Restaurant[]> {
		const { searchName, location, cuisine, hasEarlyBird, hasLastMinute} = getRestaurantsDto;
		const query = this.restaurantRepo.createQueryBuilder('restaurant');

		if (searchName) {
			query.andWhere('(restaurant.name ILIKE :searchName)', { searchName: `%${searchName}%` });
		}
		if (location) {
			query.andWhere('restaurant.location = :location', { location });
		}
		if (cuisine) {
			query.andWhere('restaurant.cuisine = :cuisine', { cuisine });
		}
		if (hasEarlyBird) {
			query.andWhere('restaurant.hasEarlyBird = :hasEarlyBird', { hasEarlyBird });
		}
		if (hasLastMinute) {
			query.andWhere('restaurant.hasLastMinute = :hasLastMinute', { hasLastMinute });
		}

		return query.getMany();
	}

	async getRestaurantById(id: string, user: User): Promise<Restaurant> {
		const query = this.restaurantRepo.createQueryBuilder('restaurant');
		query.where('restaurant.id = :id', { id })

		const lookup = await query.getOne();
		if (!lookup) {
			throw new NotFoundException(`Restaurant with ID "${id}" is not found.`);
		}
		return lookup;
	}

	async createRestaurant(createRestaurantDto: CreateRestaurantDto, user: User): Promise<Restaurant> {
		const { name, thumbnailUrl, location, cuisine, hasEarlyBird, hasLastMinute } = createRestaurantDto;

		const newRestaurant = this.restaurantRepo.create({
			id: uuid(),
			name,
			thumbnailUrl,
			location,
			cuisine,
			hasEarlyBird,
			hasLastMinute,
		});

		await this.restaurantRepo.save(newRestaurant);
		return newRestaurant;
	}

	async deleteRestaurant(id: string, user: User): Promise<void> {
		const deleteResult = await this.restaurantRepo.delete({ id });

		if (deleteResult.affected === 0) {
			throw new NotFoundException(`Restaurant with ID "${id}" is not found.`);
		}
	}

	async updateRestaurant(id: string, updateRestaurantDto: UpdateRestaurantDto, user: User): Promise<Restaurant> {
		const restaurantToUpdate = await this.getRestaurantById(id, user);
		const { name, thumbnailUrl, location, cuisine, hasEarlyBird, hasLastMinute } = updateRestaurantDto;

		if (name) {
			restaurantToUpdate.name = updateRestaurantDto.name;
		}
		if (thumbnailUrl) {
			restaurantToUpdate.thumbnailUrl = updateRestaurantDto.thumbnailUrl;
		}
		if (location) {
			restaurantToUpdate.location = updateRestaurantDto.location;
		}
		if (cuisine) {
			restaurantToUpdate.cuisine = updateRestaurantDto.cuisine;
		}
		if (hasEarlyBird) {
			restaurantToUpdate.hasEarlyBird = updateRestaurantDto.hasEarlyBird;
		}
		if (hasLastMinute) {
			restaurantToUpdate.hasLastMinute = updateRestaurantDto.hasLastMinute;
		}

		await this.restaurantRepo.save(restaurantToUpdate);
		return restaurantToUpdate;
	}
}
