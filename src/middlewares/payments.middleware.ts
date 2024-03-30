import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = Buffer.from(
        `${this.configService.get('SAF_CONSUMER_KEY')}:${this.configService.get(
          'SAF_CONSUMER_SECRET',
        )}`,
      ).toString('base64');
      const response = await axios.get(
        'https://sandbox.safaricom.co.ke/oauth/v1/generate',
        {
          headers: {
            Authorization: 'Basic ' + auth,
          },
        },
      );

      // Forward the response from the API call to the next middleware or route handler
      res.locals.apiResponse = response.data;
      next();
    } catch (error) {
      // Handle errors if any
      throw new HttpException(
        'Failed to fetch data from API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
