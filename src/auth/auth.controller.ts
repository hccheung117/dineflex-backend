import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

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
			},
		},
	})
	@Post('/signup')
	signUp(@Body('email') email: string, @Body('password') password: string): Promise<void> {
		return this.authService.signUp(email, password);
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
}
