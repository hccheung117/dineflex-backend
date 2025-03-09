import { DataSource, Repository } from "typeorm";
import { User, UserRole } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
	constructor(private dataSource: DataSource) {
		super(User, dataSource.createEntityManager());
	}
	async signUp(username: string, password: string, role: UserRole): Promise<void> {
		const user = new User();
		user.username = username;
		user.salt = await bcrypt.genSalt();
		user.password = await bcrypt.hash(password, user.salt);
		user.role = role;

		try {
			await this.save(user);
		} catch (error) {
			if (error.code === '23505') {
				throw new ConflictException('Username already exists.');
			} else {
				throw new InternalServerErrorException();
			}
		}
	}

	async validateUserPassword(username: string, password: string): Promise<User | null> {
		const user = await this.findOne({ where: { username } });
		if (user && (await user.validatePassword(password))) {
			return user;
		}
		return null;
	}
}
