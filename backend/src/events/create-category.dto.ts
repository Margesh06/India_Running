import { IsString, IsNumber, IsOptional, IsArray, IsEnum } from 'class-validator';
import { InclusiveItems } from '../entities/category.entity';

export class CreateCategoryDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  additionalInfo?: string;

  @IsOptional()
  @IsNumber()
  ageLimitMin?: number;

  @IsOptional()
  @IsNumber()
  ageLimitMax?: number;

  @IsOptional()
  @IsArray()
  @IsEnum(InclusiveItems, { each: true })
  inclusive?: InclusiveItems[];
}
