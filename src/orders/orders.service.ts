import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { getTimestamp } from 'utils';

@Injectable()
export class OrdersService {
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async makePayment(body: CreateOrderDto): Promise<any> {
    try {
      const { amount, phoneNumber, Order_ID } = body;
      const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
      const auth = `Bearer ${process.env.SAFARICOM_ACCESS_TOKEN}`;

      const timestamp = getTimestamp();
      const password = Buffer.from(process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp).toString('base64');
      const callback_url = `${process.env.BASE_URL}/api/stkPushCallback/${Order_ID}`;

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
          PartyA: phone,
          PartyB: process.env.BUSINESS_SHORT_CODE,
          PhoneNumber: phone,
          CallBackURL: callback_url,
          AccountReference: 'Wamaitha Online Shop',
          TransactionDesc: 'Paid online',
        },
        json: true,
      };

      const response = await request(options);
      return response;
    } catch (error) {
      console.error('Error initiating STK push:', error);
      throw error;
    }
  }
  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
