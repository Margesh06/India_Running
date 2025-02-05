import { IsString, IsEmail, IsNotEmpty, MinLength, IsNumber, IsOptional } from 'class-validator';

export class CreateOrganiserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsNumber()
  phone_no: number;

  @IsString()
  organizationName: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  pincode: string;

  @IsString()
  panCard: string;

  @IsNumber()
  userId: number; // Foreign Key
}
