import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Restaurant } from 'src/restaurants/restaurant.entity';
import { User } from 'src/auth/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class BookingsService {
	constructor(
		@InjectRepository(Booking)
		private BookingRepo: Repository<Booking>,

		@InjectRepository(Restaurant)
		private restaurantRepo: Repository<Restaurant>,
	) {}

	async createBooking(createBookingDto: CreateBookingDto, user: User): Promise<Booking> {
		const restaurantToBook = await this.restaurantRepo.findOne({ where: { id: createBookingDto.restaurantId } })
		if (!restaurantToBook) throw new NotFoundException('Restaurant is not found.');

		const duplicate = await this.BookingRepo.findOne({
			where: {
				restaurant: { id: createBookingDto.restaurantId },
				date: createBookingDto.date,
				time: createBookingDto.time,
			},
		});
		if (duplicate) {
			throw new BadRequestException('Selected time slot is already booked.');
		}

		const newBooking = this.BookingRepo.create({
			...createBookingDto,
			restaurant: restaurantToBook,
			user,
			status: 'confirmed',
			confirmationCode: 'DINE-' + randomUUID().slice(0, 8).toUpperCase(),
		});
		return this.BookingRepo.save(newBooking);
	}

	async getBookingById(id: string): Promise<Booking> {
		const booking = await this.BookingRepo.findOne({ where: { id }, relations: ['restaurant'] });
		if (!booking) throw new NotFoundException(`Booking with ID ${id} is not found.`);
		return booking;
	}

	async getRestaurantAvailability(restaurantId: string, date: string): Promise<any> {
		const existingBookings = await this.BookingRepo.find({ where: { date, restaurant: { id: restaurantId} } });

		const reservedTimes = existingBookings.map((b) => b.time);
		const standardTimes = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];

		const availableSlots = standardTimes.filter((t) => !reservedTimes.includes(t)).map((time) => ({
			time,
			type: 'regular',
		}));

		return {
			restaurantId,
			date,
			availableSlots,
		}
	}
}
