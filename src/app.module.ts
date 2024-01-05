import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MerchantsModule } from './merchants/merchants.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    AuthModule,
    MerchantsModule,
    CategoriesModule,
    TagsModule,
    PrismaModule,
    ProductsModule,
  ],
})
export class AppModule {}
