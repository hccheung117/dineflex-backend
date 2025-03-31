import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsOptional, IsEnum, IsArray, IsPhoneNumber, IsUrl, IsNotEmpty, MinLength } from "class-validator";
import { Counties } from "../restaurant.entity";

export class CreateRestaurantDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	name: string;

	@IsString()
	description: string;

	@IsEnum(Counties, { message: 'Not a valid county name' })
	location: Counties;

	
}

// export class CreateRestaurantDto {
// 	@ApiProperty({ description: 'Name of the restaurant', minLength: 2 })
// 	@IsNotEmpty()
// 	@IsString()
// 	@MinLength(2)
// 	name: string;

// 	@ApiProperty({ description: 'URL to the thumbnail image of this restaurant' })
// 	@IsString()
// 	thumbnailUrl: string;

// 	@ApiProperty({ description: 'The location (county) where this restaurant is located' })
// 	@IsEnum(Counties, { message: 'Not a valid county name' })
// 	location: Counties;

// 	@ApiProperty({ description: 'Country or region of the cuisine' })
// 	@IsEnum(Cuisines, { message: 'Not a valid option for cuisine' })
// 	cuisine: Cuisines;

// 	@ApiProperty({ description: 'Does this restaurant have early bird offer?' })
// 	@IsBoolean()
// 	hasEarlyBird: boolean;

// 	@ApiProperty({ description: 'Does this restaurant have last minute offer?' })
// 	@IsBoolean()
// 	hasLastMinute: boolean;
// }
