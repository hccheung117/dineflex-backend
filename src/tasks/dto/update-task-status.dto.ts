import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskStatusDto {
	@IsEnum(TaskStatus, { message: 'Invalid status value' })
	status: TaskStatus;
}
