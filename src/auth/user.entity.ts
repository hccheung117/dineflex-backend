import { Entity, PrimaryGeneratedColumn, Column, Unique, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

export enum UserRole {
	CUSTOMER = 'CUSTOMER',
	RESTAURANT_OWNER = 'RESTAURANT_OWNER',
	SERVICE_AGENT = 'SERVICE_AGENT',
	ADMIN = 'ADMIN',
}

@Entity()
@Unique(['email'])
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	@Exclude()
	password: string;

	@Column()
	@Exclude()
	salt: string;

	@Column()
	phone: string;

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

	// @BeforeInsert()
	// async hashPassword() {
	// 	this.password = await bcrypt.hash(this.password, 10);
	// }
}
