import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { AuthModule } from './auth/auth.module';
import { Restaurant } from './restaurants/restaurant.entity';
import { User } from './auth/user.entity';
import { Booking } from 'src/bookings/booking.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'dineflex-dev',
      entities: [Restaurant, User, Booking],
      autoLoadEntities: true,
      synchronize: true,
    }),
    RestaurantsModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
