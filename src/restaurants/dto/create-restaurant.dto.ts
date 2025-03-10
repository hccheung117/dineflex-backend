import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Counties, Cuisines } from "../restaurant.entity";

export class CreateRestaurantDto {
	@ApiProperty({ description: 'Name of the restaurant', minLength: 2 })
	@IsNotEmpty()
	@IsString()
	@MinLength(2)
	name: string;

	@ApiProperty({ description: 'URL to the thumbnail image of this restaurant' })
	@IsString()
	thumbnailUrl: string;

	@ApiProperty({ description: 'The location (county) where this restaurant is located' })
	@IsEnum(Counties, { message: 'Not a valid county name' })
	location: Counties;

	@ApiProperty({ description: 'Country or region of the cuisine' })
	@IsEnum(Cuisines, { message: 'Not a valid option for cuisine' })
	cuisine: Cuisines;

	@ApiProperty({ description: 'Does this restaurant have early bird offer?' })
	@IsBoolean()
	hasEarlyBird: boolean;

	@ApiProperty({ description: 'Does this restaurant have last minute offer?' })
	@IsBoolean()
	hasLastMinute: boolean;
}
