import { DataSource, Repository, UpdateResult } from "typeorm";
import { User, UserRole } from "./user.entity";
import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
	constructor(private dataSource: DataSource) {
		super(User, dataSource.createEntityManager());
	}

	async findById(id: number): Promise<User> {
		const registeredUser = await this.findOne({ where: { id } });
		if (!registeredUser) throw new NotFoundException(`User with ID ${id} is not found.`);
		return registeredUser;
	}

	async findByEmail(email: string): Promise<User> {
		const registeredUser = await this.findOne({ where: { email } });
		if (!registeredUser) throw new NotFoundException(`User with email "${email}" is not found.`);
		return registeredUser;
	}

	async deleteById(id: number): Promise<void> {
		await this.delete(id);
	}

	async deleteByEmail(email: string): Promise<void> {
		const userToBeDeleted = await this.findByEmail(email);
		await this.delete(userToBeDeleted.id);
	}

	async signUp(name: string, email: string, password: string, role: UserRole): Promise<void> {
		const user = new User();
		user.name = name;
		user.email = email;
		user.salt = await bcrypt.genSalt();
		user.password = await bcrypt.hash(password, user.salt);
		
		user.name = "";
		user.phone = "";
		user.role = role;
		
		try {
			await this.save(user);
		} catch (error) {
			if (error.code === '23505') {
				throw new ConflictException('This email is already registered.');
			} else {
				throw new InternalServerErrorException();
			}
		}
	}

	async validateUserPassword(email: string, password: string): Promise<User | null> {
		const user = await this.findOne({ where: { email } });
		if (user && (await user.validatePassword(password))) {
			return user;
		}
		return null;
	}

	async updateEmail(id: number, newEmail: string): Promise<User> {
		const existingUser = await this.findByEmail(newEmail);
		if (existingUser) {
			throw new Error('Email is already in use.');
		}
		const updateResult = await this.update(id, { email: newEmail });
		if (updateResult.affected === 0) throw new NotFoundException(`User with ID ${id} fails to update email.`);
		return this.findById(id);
	}

	async updatePassword(id: number, newPassword: string): Promise<User> {
		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(newPassword, salt);
		const updateResult = await this.update(id, { password: passwordHash, salt });
		if (updateResult.affected === 0) throw new NotFoundException(`User with ID ${id} fails to update password.`);
		return this.findById(id);
	}

	// async updateUserInfo(id: number, { name, phone }: { name: string, phone: string }): Promise<User> {
	// 	const userToUpdate = await this.findById(id);
	// 	if (name) userToUpdate.name = name;
	// 	if (phone) userToUpdate.phone = phone;
	// 	return this.save(userToUpdate);
	// }
}
