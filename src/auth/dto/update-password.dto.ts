import { IsString, Min, MinLength } from "class-validator";

export class UpdatePasswordDto {
	@IsString()
	@MinLength(6, { message: 'Password must be at least 6 characters long.' })
	newPassword: string;
}
