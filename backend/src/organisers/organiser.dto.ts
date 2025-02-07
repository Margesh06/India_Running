import { IsString, IsEmail, IsNotEmpty, Length, IsNumberString } from "class-validator";

export class CreateOrganiserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(10)
  phone_no: string;

  @IsNotEmpty()
  @IsString()
  organizationName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  pincode: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  panCard: string;
}
