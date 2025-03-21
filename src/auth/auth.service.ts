import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User, UserRole } from './user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Injectable()
export class AuthService {
	constructor(
		private userRepository: UserRepository,
		private jwtService: JwtService,
	) {}

	async signUp(signUpDto: SignUpDto): Promise<void> {
		const { name, email, password, role } = signUpDto;

		const existingUser = await this.userRepository.findOne({ where: { email } });
		if (existingUser) throw new ConflictException('Email already in use by another user.');

		this.userRepository.signUp(name, email, password, role);
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

	async updateUserInfo(id: number, updateUserInfoDto: UpdateUserInfoDto): Promise<User> {
		const userToUpdate = await this.userRepository.findById(id);
		Object.assign(userToUpdate, updateUserInfoDto);
		return this.userRepository.save(userToUpdate);
	}
}
