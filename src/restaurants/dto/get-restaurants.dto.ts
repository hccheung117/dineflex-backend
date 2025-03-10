import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsEnum, IsBoolean } from "class-validator";
import { Counties } from "../restaurant.model";
import { Cuisines } from "../restaurant.entity";

export class GetRestaurantsDto {
	@ApiPropertyOptional({ description: 'Search name of restaurant' })
	@IsOptional()
	@IsString()
	searchName?: string;

	@ApiPropertyOptional({ description: 'Choose location (county) of restaurants.', enum: Counties })
	@IsOptional()
	@IsEnum(Counties, { message: 'Not a valid county name.' })
	location?: Counties;

	@ApiPropertyOptional({ description: 'Choose country or region of cuisine.', enum: Cuisines})
	@IsOptional()
	@IsEnum(Cuisines, { message: 'Not a valid option for cuisine' })
	cuisine?: Cuisines;

	@ApiPropertyOptional({ description: 'Has early bird offer?' })
	@IsOptional()
	@IsBoolean()
	hasEarlyBird?: boolean;

	@ApiPropertyOptional({ description: 'Has last minute offer?' })
	@IsOptional()
	@IsBoolean()
	hasLastMinute?: boolean;
}