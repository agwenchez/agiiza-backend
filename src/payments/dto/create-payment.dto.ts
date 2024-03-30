import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  amount: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

//   @IsNotEmpty()
//   @IsString()
//   orderId: string;
}
