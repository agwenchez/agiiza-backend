import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  amount: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}
