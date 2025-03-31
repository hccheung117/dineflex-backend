import { Controller, Post, Body, UseGuards, Request, Get, Param, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
	constructor(private readonly bookingsService: BookingsService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	createBooking(@Body() createBookingDto: CreateBookingDto, @Request() req) {
		return this.bookingsService.createBooking(createBookingDto, req.user);
	}

	@Get(':id')
	getBookingById(@Param('id') id: string) {
		return this.bookingsService.getBookingById(id);
	}

	@Get('/restaurant/:id/availability')
	getAvailability(@Param('id') id: string, @Query('date') date: string) {
		return this.bookingsService.getRestaurantAvailability(id, date);
	}
}
