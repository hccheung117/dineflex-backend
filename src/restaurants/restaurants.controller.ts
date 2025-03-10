import { Controller, Get, Post, Delete, Patch, Param, Body, Query, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant, Counties, Cuisines } from './restaurant.entity';
import { GetRestaurantsDto } from './dto/get-restaurants.dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { User } from 'src/auth/user.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags()
@UseGuards(JwtAuthGuard)
@Controller('restaurants')
export class RestaurantsController {
	constructor(private restaurantsService: RestaurantsService) {}

	@ApiOperation({ summary: 'Retrieve all restaurants with optional filters' })
	@ApiResponse({ status: 200, description: 'List of restaurants', type: [Restaurant] })
	@Get()
	getRestaurants(@Query(ValidationPipe) getRestaurantsDto: GetRestaurantsDto, @Req() req: Request): Promise<Restaurant[]> {
		return this.restaurantsService.getRestaurants(getRestaurantsDto, req.user as User);
	}

	@ApiOperation({ summary: 'Retrieve a restaurant by its ID' })
	@ApiResponse({ status: 200, description: 'Restaurant found', type: Restaurant})
	@ApiResponse({ status: 404, description: 'Restaurant not found' })
	@Get(':id')
	getRestaurantById(@Param('id') id: string, @Req() req: Request): Promise<Restaurant> {
		return this.restaurantsService.getRestaurantById(id, req.user as User);
	}

	@ApiOperation({ summary: 'Create a new restaurant' })
	@ApiResponse({ status: 201, description: 'Restaurant created successfully', type: Restaurant })
	@Post()
	@UsePipes(ValidationPipe)
	createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto, @Req() req: Request): Promise<Restaurant> {
		return this.restaurantsService.createRestaurant(createRestaurantDto, req.user as User);
	}

	@ApiOperation({ summary: 'Delete a restaurant by ID' })
	@ApiResponse({ status: 200, description: 'Restaurant deleted successfully' })
	@ApiResponse({ status: 404, description: 'Restaurant not found' })
	@Delete(':id')
	deleteRestaurant(@Param('id') id: string, @Req() req: Request): Promise<void> {
		return this.restaurantsService.deleteRestaurant(id, req.user as User);
	}

	@ApiOperation({ summary: 'Update restaurant information' })
	@ApiResponse({ status: 200, description: 'Restaurant information updated', type: Restaurant })
	@ApiResponse({ status: 404, description: 'Restaurant not found' })
	@Patch(':id')
	@UsePipes(ValidationPipe)
	updateRestaurant(@Param('id') id: string, @Body(ValidationPipe) updateRestaurantDto: UpdateRestaurantDto, @Req() req: Request): Promise<Restaurant> {
		return this.restaurantsService.updateRestaurant(id, updateRestaurantDto, req.user as User);
	}
}
