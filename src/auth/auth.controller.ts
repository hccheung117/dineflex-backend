import { Controller, Get, Post, Put, Body, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@ApiOperation({ summary: 'User Signup' })
	// @ApiResponse({ status: 201, description: 'User registered successfully' })
	// @ApiResponse({ status: 409, description: 'Username already exists' })
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				email: { type: 'string', example: 'john' },
				password: { type: 'string', example: 'password123' },
				role: {type: 'string', example: 'CUSTOMER'},
			},
		},
	})
	@Post('/signup')
	signUp(@Body('email') email: string, @Body('password') password: string, @Body('role') role: string): Promise<void> {
		return this.authService.signUp(email, password, role);
	}

	@ApiOperation({ summary: 'User Signin (Login)' })
	// @ApiResponse({ status: 200, description: 'Returns JWT access token' })
	// @ApiResponse({ status: 401, description: 'Invalid credentials' })
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				email: { type: 'string', example: 'john' },
				password: { type: 'string', example: 'password123' },
			},
		},
	})
	@Post('/signin')
	signIn(@Body('email') email: string, @Body('password') password: string): Promise<{ accessToken: string }> {
		return this.authService.signIn(email, password);
	}

	@Put('update-email')
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
	async updateEmail(@Body() updateEmailDto: UpdateEmailDto, @Request() req) {
		return this.authService.updateEmail(req.user.id, updateEmailDto.newEmail);
	}

	@Put('update-password')
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
	async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @Request() req) {
		return this.authService.updatePassword(req.user.id, updatePasswordDto.newPassword);
	}
}
