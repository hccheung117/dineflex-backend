import { Controller, Get, Post, Delete, Patch, Param, Body, Query, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/user.entity';
import { Request } from 'express';
import { User } from 'src/auth/user.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@ApiOperation({ summary: 'Retrieve all tasks with optional filters' })
	@ApiResponse({ status: 200, description: 'List of tasks', type: [Task] })
	@Get()
	@Roles(UserRole.ADMIN, UserRole.USER)
	getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto, @Req() req: Request): Promise<Task[]> {
		return this.tasksService.getTasks(filterDto, req.user as User);
	}

	@ApiOperation({ summary: 'Retrieve a task by its ID' })
	@ApiResponse({ status: 200, description: 'Task found', type: Task})
	@ApiResponse({ status: 404, description: 'Task not found' })
	@Get(':id')
	@Roles(UserRole.ADMIN, UserRole.USER)
	getTaskById(@Param('id') id: string, @Req() req: Request): Promise<Task> {
		return this.tasksService.getTaskById(id, req.user as User);
	}

	@ApiOperation({ summary: 'Create a new task' })
	@ApiResponse({ status: 201, description: 'Task created successfully', type: Task })
	@Post()
	@Roles(UserRole.ADMIN, UserRole.USER)
	@UsePipes(ValidationPipe)
	createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: Request): Promise<Task> {
		return this.tasksService.createTask(createTaskDto, req.user as User);
	}

	@ApiOperation({ summary: 'Delete a task by ID' })
	@ApiResponse({ status: 200, description: 'Task deleted successfully' })
	@ApiResponse({ status: 404, description: 'Task not found' })
	@Delete(':id')
	@Roles(UserRole.ADMIN, UserRole.USER)
	deleteTask(@Param('id') id: string, @Req() req: Request): Promise<void> {
		return this.tasksService.deleteTask(id, req.user as User);
	}

	@ApiOperation({ summary: 'Update task status' })
	@ApiResponse({ status: 200, description: 'Task status updated', type: Task })
	@ApiResponse({ status: 404, description: 'Task not found' })
	@Patch(':id/status')
	@Roles(UserRole.ADMIN, UserRole.USER)
	@UsePipes(ValidationPipe)
	updateTaskStatus(@Param('id') id: string, @Body(ValidationPipe) updateTaskStatusDto: UpdateTaskStatusDto, @Req() req: Request): Promise<Task> {
		return this.tasksService.updateTaskStatus(id, updateTaskStatusDto, req.user as User);
	}
}
