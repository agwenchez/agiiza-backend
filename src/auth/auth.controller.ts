import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, CustomerLoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from './decorator';

@Controller('api/v1/auth/customers')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Public()
  @Post('login')
  login(@Body() createAuthDto: CustomerLoginDto) {
    return this.authService.login(createAuthDto);
  }

  @Public()
  @Get('')
  findAll() {
    return this.authService.findAll();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('generate-otp/:phoneNumber')
  sendOTP(@Param('phoneNumber') phoneNumber: string) {
    console.log('Phone no auth ', phoneNumber);
    return this.authService.sendOTP(phoneNumber);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('verify-otp/:token')
  verifyOTP(@Param('token') token: string) {
    return this.authService.verifyOTP(token);
  }

  @Public()
  @Get(':phoneNumber')
  findOne(@Param('phoneNumber') phoneNumber: string) {
    return this.authService.findOne(phoneNumber);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
