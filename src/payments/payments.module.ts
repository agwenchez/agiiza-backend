import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { ApiMiddleware } from 'src/middlewares/payments.middleware';


@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiMiddleware).forRoutes(PaymentsController);
  }
}
