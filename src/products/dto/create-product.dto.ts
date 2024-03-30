import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  // @IsNotEmpty()
  // @IsString()
  // image: string;

  @IsNotEmpty()
  @IsString()
  merchantId: string;

  @IsNotEmpty()
  @IsString()
  deliveryTime: string;

  @IsNotEmpty()
  @IsArray()
  prices: CreatePriceDto[];
}

export class CreatePriceDto {
  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}
