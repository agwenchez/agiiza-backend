import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { CreateMerchantDto, MerchantLoginDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { Public } from 'src/auth/decorator';

@Controller('api/v1/merchants')
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @Public()
  @Post()
  create(@Body() createMerchantDto: CreateMerchantDto) {
    // console.log("Body", createMerchantDto)
    return this.merchantsService.create(createMerchantDto);
  }
  @Public()
  @Post('login')
  merchantLogin(@Body() merchantData: MerchantLoginDto) {
    return this.merchantsService.merchantLogin(merchantData);
  }

  @Public()
  @Get()
  findAll() {
    return this.merchantsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchantsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) {
    return this.merchantsService.update(id, updateMerchantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantsService.remove(id);
  }
}
