import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum Counties {
	CARLOW = 'Carlow',
	CAVAN = 'Cavan',
	CLARE = 'Clare',
	CORK = 'Cork',
	DONEGAL = 'Donegal',
	DUBLIN_CITY = 'Dublin City',			// Dublin
	DL_RATHDOWN = 'Dun Laoghaire-Rathdown',	// Dublin
	FINGAL = 'Fingal',						// Dublin
	SOUTH_DUBLIN = 'South Dublin',			// Dublin
	GALWAY = 'Galway',
	KERRY = 'Kerry',
	KILDARE = 'Kildare',
	KILKENNY = 'Kilkenny',
	LAOIS = 'Laois',
	LEITRIM = 'Leitrim',
	LIMERICK = 'Limerick',
	LONGFORD = 'Longford',
	LOUTH = 'Louth',
	MAYO = 'Mayo',
	MEATH = 'Meath',
	MONAGHAN = 'Monaghan',
	OFFALY = 'Offaly',
	ROSCOMMON = 'Roscommon',
	SLIGO = 'Sligo',
	TIPPERARY = 'Tipperary',
	WATERFORD = 'Waterford',
	WESTMEATH = 'Westmeath',
	WEXFORD = 'Wexford',
	WICKLOW = 'Wicklow',
}

@Entity()
export class Restaurant {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({
		type: 'enum',
		enum: Counties,
	})
	location: Counties;
	
	@Column()
	cuisine: string;

	@Column()
	phone: string;
	
	@Column({ default: false })
	hasEarlyBird: boolean;
	
	@Column({ default: false })
	hasLastMinute: boolean;

	@Column()
	thumbnailUrl: string;
}

export enum Cuisines {
	AMERICAN = 'American',
	MEXICAN = 'Mexican',
	CARIBBEAN = 'Caribbean',
	SOUTH_AMERICAN = 'South American',
	BRAZILIAN = 'Brazilian',

	EUROPEAN = 'European',
	ENGLISH = 'English',
	FRENCH = 'French',
	ITALIAN = 'Italian',
	SPANISH = 'Spanish',
	PORTUGUESE = 'Portuguese',
	GERMAN = 'German',
	POLISH = 'Polish',
	SWEDISH = 'Swedish',
	IRISH = 'Irish',
	GREEK = 'Greek',

	TURKISH = 'Turkish',
	PERSIAN = 'Persian',
	ARABIAN = 'Arabian',
	AFRICAN = 'African',
	ETHIOPIAN = 'Ethiopian',

	ASIAN = 'Asian',
	EAST_ASIAN = 'East Asian',
	CHINESE = 'Chinese',
	JAPANESE = 'Japanese',
	KOREAN = 'Korean',
	SOUTH_ASIAN = 'South Asian',
	INDIAN = 'Indian',
	PAKISTANI = 'Pakistani',
	BANGLADESHI = 'Bangladeshi',
	SOUTHEAST_ASIAN = 'Southeast Asian',
	VIETNAMESE = 'Vietnamese',
	THAI = 'Thai',
	MALAYSIAN = 'Malaysian',
	INDONESIAN = 'Indonesian',
	PACIFIC_ISLANDS = 'Pacific Islands',
}
