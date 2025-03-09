import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsEnum, IsBoolean } from "class-validator";
import { Counties } from "../restaurant.model";

export class GetRestaurantsDto {
	@ApiPropertyOptional({ description: 'Search name of restaurant' })
	@IsOptional()
	@IsString()
	searchName?: string;

	@ApiPropertyOptional({ description: 'Choose location (county) of restaurants.', enum: Counties })
	@IsOptional()
	@IsEnum(Counties, { message: 'Invalid county name.' })
	location?: Counties;

	@ApiPropertyOptional({ description: 'Has early bird offer?' })
	@IsOptional()
	@IsBoolean()
	hasEarlyBird?: boolean;

	@ApiPropertyOptional({ description: 'Has last minute offer?' })
	@IsOptional()
	@IsBoolean()
	hasLastMinute?: boolean;
}