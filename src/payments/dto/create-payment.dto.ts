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


export class StkCallbackDto {
    Body: {
      stkCallback: {
        MerchantRequestID: string;
        CheckoutRequestID: string;
        ResultCode: number;
        ResultDesc: string;
        CallbackMetadata: {
          Item: {
            Name: string;
            Value: string;
          }[];
        };
      };
    };
  }
  