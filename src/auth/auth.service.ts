import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserRole } from './user.entity';

@Injectable()
export class AuthService {
	constructor(
		private userRepository: UserRepository,
		private jwtService: JwtService,
	) {}

	async signUp(username: string, password: string, role: UserRole = UserRole.CUSTOMER): Promise<void> {
		return this.userRepository.signUp(username, password, role);
	}

	async signIn(username: string, password: string): Promise<{ accessToken: string }> {
		const user = await this.userRepository.validateUserPassword(username, password);

		if (!user) {
			throw new UnauthorizedException('Invalid credentials.');
		}

		const payload = { username };
		const accessToken = await this.jwtService.sign(payload);

		return { accessToken };
	}
}
