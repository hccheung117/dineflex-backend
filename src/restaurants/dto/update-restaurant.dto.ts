import { IsBoolean, IsEnum, IsOptional, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Counties, Cuisines } from "../restaurant.entity";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateRestaurantDto {
	@ApiPropertyOptional({ description: 'Change name of restaurant' })
	@IsNotEmpty()
	@IsOptional()
	@IsString()
	@MinLength(2)
	name: string;

	@ApiPropertyOptional({ description: 'Change URL to the thumbnail image' })
	@IsString()
	thumbnailUrl: string;

	@ApiPropertyOptional({ description: 'Change location (county) of restaurant' })
	@IsOptional()
	@IsEnum(Counties, { message: 'Not a valid county name' })
	location: Counties;

	@ApiPropertyOptional({ description: 'Change country or region of the cuisine' })
	@IsEnum(Cuisines, { message: 'Not a valid option for cuisine' })
	cuisine: Cuisines;

	@ApiPropertyOptional({ description: 'Change early bird offer availability (yes/no)' })
	@IsBoolean()
	hasEarlyBird: boolean;

	@ApiPropertyOptional({ description: 'Change last minute offer availability (yes/no)' })
	@IsBoolean()
	hasLastMinute: boolean;
}
