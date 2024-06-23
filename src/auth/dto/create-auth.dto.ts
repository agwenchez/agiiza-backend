import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email;

  @IsNotEmpty()
  @IsString()
  phoneNumber;

  @IsNotEmpty()
  @IsString()
  gender;

  @IsNotEmpty()
  @IsString()
  dateOfBirth;

  @IsNotEmpty()
  @IsString()
  firstName;

  @IsNotEmpty()
  @IsString()
  lastName;

  @IsNotEmpty()
  @IsString()
  password;

  @IsNotEmpty()
  @IsString()
  role: string;
}


export class CustomerLoginDto {
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  }
  