import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multerConfig';
import { Express, Request, Response } from 'express';
import { Public } from 'src/auth/decorator';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  create(@Body() createProductDto: CreateProductDto,  @UploadedFile() file: Express.Multer.File,) {
    return this.productsService.create(createProductDto, file);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // @Public()
  // @Post('upload-single')
  // @UseInterceptors(FileInterceptor('file', multerConfig))
  // async uploadFile(
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.productsService.uploadFile(file)
  // }

  @Get('/merchant/:id')
  findProductsByMerchant(@Param('id') id: string) {
    return this.productsService.findProductsByMerchant(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
