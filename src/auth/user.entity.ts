import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

export enum UserRole {
	CUSTOMER = 'CUSTOMER',
	BUSINESS = 'BUSINESS',
	AGENT = 'AGENT',
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
		default: UserRole.CUSTOMER,
	})
	role: UserRole;

	async validatePassword(password: string): Promise<boolean> {
		const hash = await bcrypt.hash(password, this.salt);
		return hash === this.password;
	}
}
