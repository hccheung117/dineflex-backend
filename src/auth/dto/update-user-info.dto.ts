import { IsString, IsOptional, MinLength, IsMobilePhone, Min } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserInfoDto {
	@ApiPropertyOptional({ description: 'Update name of the user' })
	@IsOptional()
	@IsString()
	@MinLength(2, { message: 'Name must have 2 or more characters' })
	name?: string;

	@ApiPropertyOptional({ description: 'Update phone number of the user' })
	@IsOptional()
	@IsMobilePhone('en-IE', undefined, { message: 'Invalid phone number' })
	phone?: string;
}
