import { Controller, Get, Post, Put, Delete, Patch, Param, Body, Query, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant, Counties } from './restaurant.entity';
// import { GetRestaurantsDto } from './dto/get-restaurants.dto';
// import { CreateRestaurantDto } from './dto/create-restaurant.dto';
// import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { Request } from 'express';
import { User } from '../auth/user.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// @ApiBearerAuth()
// @ApiTags()
// @UseGuards(JwtAuthGuard)
@Controller('restaurants')
export class RestaurantsController {
	constructor(private readonly restaurantsService: RestaurantsService) {}

	@ApiOperation({ summary: 'Retrieve all restaurants' })
	@Get()
	async getAll() {
		return this.restaurantsService.findAll();
	}

	@ApiOperation({ summary: 'Retrieve a restaurant by its ID' })
	@Get(':id')
	async getOne(@Param('id') id: string) {
		return this.restaurantsService.findOne(id);
	}

	@ApiOperation({ summary: 'Create a new restaurant' })
	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Body() restaurantData: Partial<Restaurant>, @Request() req) {
		return this.restaurantsService.create(restaurantData, req.user);
	}

	@ApiOperation({ summary: 'Update restaurant information' })
	@UseGuards(JwtAuthGuard)
	@Put(':id')
	async update(@Param('id') id: string, @Body() updateData: Partial<Restaurant>, @Request() req) {
		return this.restaurantsService.update(id, updateData, req.user);
	}

	@ApiOperation({ summary: 'Delete a restaurant by ID' })
	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id') id: string, @Request() req) {
		return this.restaurantsService.delete(id, req.user);
	}

	// @ApiOperation({ summary: 'Retrieve all restaurants with optional filters' })
	// @ApiResponse({ status: 200, description: 'List of restaurants', type: [Restaurant] })
	// @Get()
	// findAll(@Query(ValidationPipe) getRestaurantsDto: GetRestaurantsDto, @Req() req: Request): Promise<Restaurant[]> {
	// 	return this.restaurantsService.findAll(getRestaurantsDto, req.user as User);
	// }

	// @ApiOperation({ summary: 'Retrieve a restaurant by its ID' })
	// @ApiResponse({ status: 200, description: 'Restaurant found', type: Restaurant})
	// @ApiResponse({ status: 404, description: 'Restaurant not found' })
	// @Get(':id')
	// findOne(@Param('id') id: string, @Req() req: Request): Promise<Restaurant> {
	// 	return this.restaurantsService.findOne(id, req.user as User);
	// }

	// @ApiOperation({ summary: 'Create a new restaurant' })
	// @ApiResponse({ status: 201, description: 'Restaurant created successfully', type: Restaurant })
	// @Post()
	// @UsePipes(ValidationPipe)
	// create(@Body() createRestaurantDto: CreateRestaurantDto, @Req() req: Request): Promise<Restaurant> {
	// 	return this.restaurantsService.create(createRestaurantDto, req.user as User);
	// }

	// @ApiOperation({ summary: 'Delete a restaurant by ID' })
	// @ApiResponse({ status: 200, description: 'Restaurant deleted successfully' })
	// @ApiResponse({ status: 404, description: 'Restaurant not found' })
	// @Delete(':id')
	// delete(@Param('id') id: string, @Req() req: Request): Promise<void> {
	// 	return this.restaurantsService.delete(id, req.user as User);
	// }

	// @ApiOperation({ summary: 'Update restaurant information' })
	// @ApiResponse({ status: 200, description: 'Restaurant information updated', type: Restaurant })
	// @ApiResponse({ status: 404, description: 'Restaurant not found' })
	// @Patch(':id')
	// @UsePipes(ValidationPipe)
	// update(@Param('id') id: string, @Body(ValidationPipe) updateRestaurantDto: UpdateRestaurantDto, @Req() req: Request): Promise<Restaurant> {
	// 	return this.restaurantsService.update(id, updateRestaurantDto, req.user as User);
	// }
}
