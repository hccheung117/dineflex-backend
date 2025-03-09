import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from '../tasks/task.entity';
import { Exclude } from 'class-transformer';

export enum UserRole {
	USER = 'USER',
	ADMIN = 'ADMIN',
}

@Entity()
@Unique(['username'])
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	@Exclude()
	password: string;

	@Column()
	@Exclude()
	salt: string;

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.USER,
	})
	role: UserRole;

	@OneToMany(() => Task, task => task.user, { eager: true })
	tasks: Task[];

	async validatePassword(password: string): Promise<boolean> {
		const hash = await bcrypt.hash(password, this.salt);
		return hash === this.password;
	}
}
