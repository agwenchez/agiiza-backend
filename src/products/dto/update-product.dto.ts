import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

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

  prices: CreatePriceDto[];
}

export class CreatePriceDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}
