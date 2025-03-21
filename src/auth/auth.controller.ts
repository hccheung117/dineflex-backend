import { Controller, Get, Post, Put, Body, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@ApiBearerAuth()
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
				name: { type: 'string', example: 'John Smith' },
				email: { type: 'string', example: 'john.smith@gmail.com' },
				password: { type: 'string', example: 'password123' },
				role: {type: 'string', example: 'CUSTOMER'},
			},
		},
	})
	@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
	@Post('/signup')
	async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
		return this.authService.signUp(signUpDto);
	}

	@ApiOperation({ summary: 'User Signin (Login)' })
	// @ApiResponse({ status: 200, description: 'Returns JWT access token' })
	// @ApiResponse({ status: 401, description: 'Invalid credentials' })
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				email: { type: 'string', example: 'john.smith@gmail.com' },
				password: { type: 'string', example: 'password123' },
			},
		},
	})
	@Post('/signin')
	signIn(@Body('email') email: string, @Body('password') password: string): Promise<{ accessToken: string }> {
		return this.authService.signIn(email, password);
	}

	@ApiOperation({ summary: 'Change user\'s email' })
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
	@Put('update-email')
	async updateEmail(@Body() updateEmailDto: UpdateEmailDto, @Request() req) {
		return this.authService.updateEmail(req.user.id, updateEmailDto.newEmail);
	}

	@ApiOperation({ summary: 'Change user\'s password' })
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
	@Put('update-password')
	async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @Request() req) {
		return this.authService.updatePassword(req.user.id, updatePasswordDto.newPassword);
	}

	@ApiOperation({ summary: 'Update user information' })
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
	@Put('update-user-info')
	async updateUserInfo(@Body() updateUserInfoDto: UpdateUserInfoDto, @Request() req) {
		return this.authService.updateUserInfo(req.user.id, updateUserInfoDto)
	}
}
