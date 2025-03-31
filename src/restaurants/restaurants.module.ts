import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './restaurant.entity';
import { RestaurantTimeSlot } from './restaurant-time-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, RestaurantTimeSlot])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService]
})
export class RestaurantsModule {}
