import { IsArray, IsOptional, IsString, Matches } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

export class UpdateWeeklyScheduleDto {
	@ApiPropertyOptional({ type: [String], example: ['17:00', '18:30'] })
	@IsOptional()
	@IsArray()
	@Matches(TIME_REGEX, { each: true, message: 'Time must be in HH:MM format' })
	monday?: string[];

	@ApiPropertyOptional({ type: [String] })
	@IsOptional()
	@IsArray()
	@Matches(TIME_REGEX, { each: true })
	tuesday?: string[];

	@ApiPropertyOptional({ type: [String] })
	@IsOptional()
	@IsArray()
	@Matches(TIME_REGEX, { each: true })
	wednesday?: string[];

	@ApiPropertyOptional({ type: [String] })
	@IsOptional()
	@IsArray()
	@Matches(TIME_REGEX, { each: true })
	thursday?: string[];

	@ApiPropertyOptional({ type: [String] })
	@IsOptional()
	@IsArray()
	@Matches(TIME_REGEX, { each: true })
	friday?: string[];

	@ApiPropertyOptional({ type: [String] })
	@IsOptional()
	@IsArray()
	@Matches(TIME_REGEX, { each: true })
	saturday?: string[];

	@ApiPropertyOptional({ type: [String] })
	@IsOptional()
	@IsArray()
	@Matches(TIME_REGEX, { each: true })
	sunday?: string[];
}
