import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { AccessTokenMiddleware } from 'src/middlewares/payments.middleware';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AccessTokenMiddleware)
  //     .forRoutes({ path: 'api/v1/payments', method: RequestMethod.POST });
  // }
}
