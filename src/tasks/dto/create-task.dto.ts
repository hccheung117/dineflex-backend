import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
	@ApiProperty({ description: 'Title of the task' })
	@IsNotEmpty()
	@IsString()
	title: string;

	@ApiProperty({ description: 'Detailed description of the task', minLength: 5 })
	@IsNotEmpty()
	@IsString()
	@MinLength(5)
	description: string;
}
