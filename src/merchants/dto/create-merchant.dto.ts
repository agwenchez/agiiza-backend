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
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

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
  lng:string;
  
  @IsNotEmpty()
  @IsString()
  lat: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  nearbyLandmarkLng: string;
  
  @IsNotEmpty()
  @IsString()
  nearbyLandmarkLat: string;
}

export class CreateMerchantLocationDto {
  @IsNotEmpty()
  @IsString()
  merchantId : string;

  @IsNotEmpty()
  @IsString()
  lng: string;

  @IsNotEmpty()
  @IsString()
  lat: string;
}
