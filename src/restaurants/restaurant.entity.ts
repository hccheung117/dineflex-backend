import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Counties } from "./restaurant.model";

@Entity()
export class Restaurant {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	thumbnailUrl: string;

	@Column({
		type: 'enum',
		enum: Counties,
	})
	location: Counties;

	@Column()
	cuisine: string;

	@Column()
	hasEarlyBird: boolean;

	@Column()
	hasLastMinute: boolean;
}
