import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Restaurant } from "../restaurants/restaurant.entity";
import { User } from "../auth/user.entity";

@Entity()
export class Booking {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => User)
	user: User;

	@ManyToOne(() => Restaurant)
	restaurant: Restaurant;

	@Column()
	date: string;

	@Column()
	time: string;

	@Column()
	partySize: number;

	@Column({ default: 'confirmed' })
	status: string;
}
