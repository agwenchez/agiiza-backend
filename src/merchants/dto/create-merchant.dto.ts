import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMerchantDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  storeName: string;

  @IsNotEmpty()
  @IsString()
  storeAddress: string;

  @IsNotEmpty()
  @IsString()
  nearbyLandmark: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  categories: string[];

  @IsOptional()
  @IsString()
  tags: string[];
}
