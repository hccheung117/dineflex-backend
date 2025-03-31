import { IsUUID, IsDateString, IsString, IsEmail, IsPhoneNumber, Min, Max } from "class-validator";

export class CreateBookingDto {
	@IsUUID()
	restaurantId: string;

	@IsDateString()
	date: string;

	@IsString()
	time: string;

	@Min(1)
	@Max(12)
	partySize: number;
}
