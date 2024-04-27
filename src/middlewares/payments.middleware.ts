import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { CustomRequest } from 'src/@types';


@Injectable()
export class AccessTokenMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const url =
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
      const auth = Buffer.from(
        `${this.configService.get(
          'SAFARICOM_CONSUMER_KEY',
        )}:${this.configService.get('SAFARICOM_CONSUMER_SECRET')}`,
      ).toString('base64');

      const response = await axios.get(url, {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      console.log("MPESA TOKEN", response.data)
      req.access_token = response.data.access_token;
      next();
    } catch (error) {
      console.error('Access token error:', error);
      throw new HttpException(
        'Failed to fetch access token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
