import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
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
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  categories: string[];

  @IsOptional()
  @IsArray()
  tags: string[];

  @IsNotEmpty()
  @IsString()
  lng;
  
  @IsNotEmpty()
  @IsString()
  lat;

  @IsNotEmpty()
  @IsString()
  nearbyLandmarkLng;
  
  @IsNotEmpty()
  @IsString()
  nearbyLandmarkLat;
}

export class CreateMerchantLocationDto {
  @IsNotEmpty()
  @IsString()
  merchantId;

  @IsNotEmpty()
  @IsString()
  lng;

  @IsNotEmpty()
  @IsString()
  lat;
}
