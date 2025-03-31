import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Restaurant } from 'src/restaurants/restaurant.entity';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { RestaurantTimeSlot } from 'src/restaurants/restaurant-time-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Restaurant, RestaurantTimeSlot])],
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule {}
