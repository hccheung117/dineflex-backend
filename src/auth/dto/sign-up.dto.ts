import { IsEmail, IsString, IsEnum, MinLength } from "class-validator";
import { UserRole } from "../user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
	@ApiProperty({ description: 'Name of the user' })
	@IsString()
	@MinLength(2, { message: 'Name must have 2 or more characters' })
	name: string;

	@ApiProperty({ description: 'Email address of the user' })
	@IsEmail()
	email: string;

	@ApiProperty({ description: 'Password (minimum 6 characters)' })
	@IsString()
	@MinLength(6, { message: 'Password must contain 6 or more characters' })
	password: string;

	@ApiProperty({ description: 'Role of the user, must be one of the following: "CUSTOMER", "RESTAURANT_OWNER", "SERVICE_AGENT", or "ADMIN"' })
	@IsEnum(UserRole, { message: 'Not a valid user role' })
	role: UserRole;
}
