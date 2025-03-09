import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { v4 as uuid } from 'uuid';
import { User, UserRole } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task)
		private taskRepository: Repository<Task>,
	) {}

	async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
		const { status, search } = filterDto;
		const query = this.taskRepository.createQueryBuilder('task');

		if (user.role !== UserRole.ADMIN) {
			query.where('task.userId = :userId', { userId: user.id });
		}

		if (status) {
			query.andWhere('task.status = :status', { status });
		}
		if (search) {
			query.andWhere(
				'(task.title ILIKE :search OR task.description ILIKE :search)',
				{ search: `%${search}%` },
			);
		}
		return query.getMany();
	}

	async getTaskById(id: string, user: User): Promise<Task> {
		const query = this.taskRepository.createQueryBuilder('task');

		if (user.role !== UserRole.ADMIN) {
			query.where('task.id = :id AND task.userId = :userId', { id, userId: user.id });
		} else {
			query.where('task.id = :id', { id })
		}

		const lookup = await query.getOne();
		if (!lookup) {
			throw new NotFoundException(`Task with ID "${id}" is not found.`);
		}

		return lookup;
	}

	async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
		const { title, description } = createTaskDto;

		const newTask = this.taskRepository.create({
			id: uuid(),
			title,
			description,
			status: TaskStatus.OPEN,
			user,
		});

		await this.taskRepository.save(newTask)
		return newTask;
	}

	async deleteTask(id: string, user: User): Promise<void> {
		const deleteResult = await this.taskRepository.delete({ id, user });

		if (deleteResult.affected === 0) {
			throw new NotFoundException(`Task with ID "${id}" is not found.`);
		}
	}

	async updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto, user: User): Promise<Task> {
		const taskToUpdate = await this.getTaskById(id, user);
		taskToUpdate.status = updateTaskStatusDto.status;
		await this.taskRepository.save(taskToUpdate);
		return taskToUpdate;
	}
}
