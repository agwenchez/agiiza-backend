import { Module } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { MerchantsController } from './merchants.controller';
import { CategoriesService } from 'src/categories/categories.service';
import { AccessTokenStrategy } from 'src/auth/strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [MerchantsController],
  providers: [MerchantsService, CategoriesService, AccessTokenStrategy],
})
export class MerchantsModule {}
