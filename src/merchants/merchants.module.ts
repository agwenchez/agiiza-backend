import { Module } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { MerchantsController } from './merchants.controller';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  controllers: [MerchantsController],
  providers: [MerchantsService, CategoriesService],
})
export class MerchantsModule {}
