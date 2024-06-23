import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, StkCallbackDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CustomRequest } from 'src/@types';
import axios from 'axios';
import { getTimestamp } from 'utils';

@Controller('api/v1/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
  @Post()
  async makePayment(
    @Body() body: CreatePaymentDto,
    // req: CustomRequest,
  ): Promise<any> {
    try {
      const response = await this.paymentsService.makePayment(body);
      return response;
    } catch (error) {
      // console.error('Error initiating STK push:', error);
      throw error;
    }
  }
  @Post('callback')
  async stkPushCallback(
    @Body() body: any,
  ) {
    console.log("Callback body", body)
    try {
      // Destructure the body object to get callback details
      const {
        MerchantRequestID,
        CheckoutRequestID,
        ResultCode,
        ResultDesc,
        CallbackMetadata,
      } = body.Body.stkCallback;

      // Extract metadata from CallbackMetadata and process further
      // const meta = Object.values(await CallbackMetadata.Item);
      // const PhoneNumber = meta
      //   .find((o) => o.Name === 'PhoneNumber')
      //   .Value.toString();
      // const Amount = meta.find((o) => o.Name === 'Amount').Value.toString();
      // const MpesaReceiptNumber = meta
      //   .find((o) => o.Name === 'MpesaReceiptNumber')
      //   .Value.toString();
      // const TransactionDate = meta
      //   .find((o) => o.Name === 'TransactionDate')
      //   .Value.toString();

      // Log the output
      console.log('-'.repeat(20), ' OUTPUT IN THE CALLBACK ', '-'.repeat(20));
      console.log(`
      MerchantRequestID : ${MerchantRequestID},
      CheckoutRequestID: ${CheckoutRequestID},
      ResultCode: ${ResultCode},
      ResultDesc: ${ResultDesc},

      `);

      return true; // Return success response
    } catch (e) {
      console.error(
        'Error while trying to update LipaNaMpesa details from the callback',
        e,
      );
      throw new Error('Something went wrong with the callback');
    }
  }

  @Post('/confirmation/:checkoutRequestID')
  async confirmPayment(@Param('checkoutRequestID') checkoutRequestID: string) {
    try {
      const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query';
      const access_token = await this.paymentsService.generateAccessToken()
      const auth = `Bearer ${access_token}`;
      console.log("Auth", auth)

      const timestamp = getTimestamp();
      const password = Buffer.from(
        process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp,
      ).toString('base64');

      const response = await axios.post(
        url,
        {
          BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
          Password: password,
          Timestamp: timestamp,
          CheckoutRequestID: checkoutRequestID,
        },
        {
          headers: {
            Authorization: auth,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw new HttpException(
        {
          message: 'Something went wrong while trying to confirm payment. Contact admin',
          error: error.message,
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}