import { IsArray, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber  } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  venue: string;

  @IsArray()
  @IsNotEmpty()
  gallery_images: string[];

  @IsNotEmpty()
  @IsNumber()
  organiser_id: number;

  @IsEnum(["OnGround", "Virtual", "OnGround+Virtual"])
  event_type: string;

  @IsEnum(["Running", "Walking", "Cycling"])
  activity_type: string;

  @IsNotEmpty()
  @IsDate()
  start_date: Date;

  @IsNotEmpty()
  @IsDate()
  end_date: Date;

  @IsOptional()
  @IsDate()
  reg_close_date?: Date;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  pincode: string;

  @IsNotEmpty()
  @IsString()
  area: string;

  @IsNotEmpty()
  @IsString()
  banner_image: string;

  @IsNotEmpty()
  @IsString()
  mobile_banner: string;
}
