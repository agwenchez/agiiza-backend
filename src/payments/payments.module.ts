import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentMiddleware } from 'src/middlewares/payments.middleware';


@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PaymentMiddleware).forRoutes({ path: 'api/v1/payments', method: RequestMethod.POST});
  }
}
