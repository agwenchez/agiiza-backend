import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import axios from 'axios';
// import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { getTimestamp } from 'utils';
import ngrok from 'ngrok'
// import { Request } from 'express';
import { CustomRequest } from 'src/@types';

@Injectable()
export class PaymentsService {
  configService: any;
  // create(createPaymentDto: CreatePaymentDto) {
  //   return 'This action adds a new payment';
  // }
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

  async generateAccessToken() {
    try {
      const url =
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
      const auth = Buffer.from(
        `${process.env.SAFARICOM_CONSUMER_KEY}:${process.env.SAFARICOM_CONSUMER_SECRET}`,
      ).toString('base64');

      const response = await axios.get(url, {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      // console.log('MPESA TOKEN', response.data.access_token);
      return response.data.access_token
    } catch (error) {
      console.log('Error', error);
    }
  }
  async makePayment(body: CreatePaymentDto): Promise<any> {
    const access_token = await this.generateAccessToken()
    // console.log('Access token', access_token);
    try {
      const { amount, phoneNumber } = body;
      const url =
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
      const auth = `Bearer ${access_token}`;

      const timestamp = getTimestamp();
      const password = Buffer.from(
        process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp,
      ).toString('base64');
      // const callback_url = `${process.env.BASE_URL}/api/stkPushCallback/`;
         // create callback url
         const callback_url = 'https://3348-102-220-12-50.ngrok-free.app'
        //  const api = ngrok.getApi();
        //  await api.listTunnels();
         console.log("Callback", callback_url);

      const data = {
        BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: process.env.BUSINESS_SHORT_CODE,
        PhoneNumber: phoneNumber,
        CallBackURL: `${callback_url}/payments/callback`,
        AccountReference: 'Agiiza',
        TransactionDesc: 'Pay your order by lipa na mpesa',
      };
      const response = await axios.post(url, data, {
        headers: {
          Authorization: auth,
        },
      });
      console.log('Api response', response.data);
      return response.data;
    } catch (error) {
      console.error('Error initiating STK push:', error);
      throw error;
    }
  }
}
