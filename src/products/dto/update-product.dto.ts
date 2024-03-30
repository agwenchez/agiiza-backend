// import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
// import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsString()
  merchantId: string;

  @IsNotEmpty()
  @IsArray()
  prices: UpdatePriceDto[];
}

export class UpdatePriceDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  value: string;
  
  @IsNotEmpty()
  @IsString()
  unit: string;
}
