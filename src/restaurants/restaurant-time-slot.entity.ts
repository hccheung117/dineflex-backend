import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from "typeorm";
import { Restaurant } from "./restaurant.entity";
import { Weekday } from "../common/weekdays.enum";

@Entity()
@Unique(['restaurant', 'dayOfWeek'])
export class RestaurantTimeSlot {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => Restaurant, (restaurant) => restaurant.id)
	restaurant: Restaurant;

	@Column({
		type: 'enum',
		enum: Weekday,
	})
	dayOfWeek: Weekday;

	@Column('simple-array')
	timeSlots: string[];
}
