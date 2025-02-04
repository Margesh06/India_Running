import { IsString, IsOptional, IsEnum, IsInt, IsDate, IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsEnum(['Maharastra', 'Delhi', 'Karnataka', 'Uttar Pradesh', 'Tamil Nadu', 'West Bengal'])
  state?: string;

  @IsOptional()
  @IsEnum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
  bloodGroup?: string;

  @IsOptional()
  @IsEnum(['American', 'Canadian', 'British', 'Austrialian', 'Indian', 'Brazilian', 'German', 'French', 'Japanese'])
  nationality?: string;

  @IsOptional()
  @IsString()
  pincode?: string;

  @IsOptional()
  @IsInt()
  phone_no?: number;

  @IsOptional()
  @IsEnum(['United States', 'Canada', 'United Kingdom', 'Austrialia', 'India', 'Brazil', 'German', 'France', 'Japan'])
  country?: string;

  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @IsOptional()
  @IsInt()
  emergencyContactNumber?: number;

  @IsOptional()
  @IsEnum(['Male', 'Female'])
  gender?: string;

  @IsOptional()
  @IsDate()
  dob?: Date;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsEnum(['6 UK', '7 UK', '8 UK', '9 UK', '10 UK'])
  shoesize?: string;

  @IsOptional()
  @IsEnum(['XS', 'S', 'M', 'L', 'XL', '2XL'])
  tshirtsize?: string;

  @IsOptional()
  @IsEnum(['10K', 'HALF MARATHON', 'FULL MARATHON', 'NOT APPLICABLE'])
  raceType?: string;

  @IsOptional()
  @IsEnum(['Aadhar Card', 'PAN Card', 'Passport', 'Driving License'])
  documentType?: string;

  @IsOptional()
  @IsString()
  frontPhoto?: string;

  @IsOptional()
  @IsString()
  backPhoto?: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  user_id: number;
}
