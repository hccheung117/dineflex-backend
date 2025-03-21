import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User, UserRole } from './user.entity';

@Injectable()
export class AuthService {
	constructor(
		private userRepository: UserRepository,
		private jwtService: JwtService,
	) {}

	async signUp(email: string, password: string, role: string): Promise<void> {
		if (!(role in UserRole)) {
			throw new BadRequestException('The role of the new user is not valid.');
		}
		return this.userRepository.signUp(email, password, role as UserRole);
	}

	async signIn(email: string, password: string): Promise<{ accessToken: string }> {
		const user = await this.userRepository.validateUserPassword(email, password);
		if (!user) {
			throw new UnauthorizedException('Invalid credentials.');
		}

		const payload = { email };
		const accessToken = await this.jwtService.sign(payload);
		return { accessToken };
	}

	async updateEmail(id: number, newEmail: string): Promise<User> {
		try {
			return await this.userRepository.updateEmail(id, newEmail);
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async updatePassword(id: number, newPassword: string): Promise<User> {
		return await this.userRepository.updatePassword(id, newPassword);
	}
}
