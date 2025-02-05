import { IsEmail, IsNotEmpty, IsOptional, MinLength, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  fname: string;

  @IsOptional()
  lname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsOptional()  
  @IsString()
  role: string = "user";
}
