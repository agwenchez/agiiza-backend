import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import axios from 'axios';
// import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { getTimestamp } from 'utils';

@Injectable()
export class PaymentsService {
  // create(createPaymentDto: CreatePaymentDto) {
  //   return 'This action adds a new payment';
  // }

  async makePayment(body: CreatePaymentDto): Promise<any> {
    try {
      const { amount, phoneNumber } = body;
      const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
      const auth = `Bearer ${process.env.SAFARICOM_ACCESS_TOKEN}`;

      const timestamp = getTimestamp();
      const password = Buffer.from(process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp).toString('base64');
      const callback_url = `${process.env.BASE_URL}/api/stkPushCallback/`;

      const options = {
        url,
        method: 'POST',
        headers: {
          Authorization: auth,
        },
        body: {
          BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: amount,
          PartyA: phoneNumber,
          PartyB: process.env.BUSINESS_SHORT_CODE,
          PhoneNumber: phoneNumber,
          CallBackURL: callback_url,
          AccountReference: 'Wamaitha Online Shop',
          TransactionDesc: 'Paid online',
        },
        json: true,
      };

      // const response = await this.httpService.post(url, requestBody, {
      //   headers: {
      //     Authorization: auth,
      //   },
      // }).toPromise();
      const response = await axios.post(url, body, {
        headers:{
          
        }
      })

      return response.data;
    } catch (error) {
      console.error('Error initiating STK push:', error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
