import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAuthDto, CustomerLoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private configService: ConfigService,  private readonly prismaService: PrismaService) {}
  async create(createAuthDto: CreateAuthDto) {
    let hash = await argon.hash(createAuthDto.password);
    try {
      // const {
      //   email,
      //   firstName,
      //   lastName,
      //   gender,
      //   dateOfBirth,
      //   phoneNumber,
      //   password,
      // } = createAuthDto;

      const newCustomer = await this.prismaService.customer.create({
        data: {
          ...createAuthDto,
          password: hash
        }
      })
      const access_token = await this.signToken(newCustomer.id, createAuthDto.email);
      // console.log("New customer created", newCustomer)
      delete newCustomer.password;
      return { customer: { ...newCustomer }, ...access_token };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Customer with that phone number already exists');
      }
      console.log("Error", error)
      throw error;
    }
  }
  async login(customerLoginDto: CustomerLoginDto) {
    const { phoneNumber, password } = customerLoginDto;
    try {
      const customer = await this.prismaService.customer.findUnique({
        where: {
          phoneNumber,
        },
      });
      if (!customer) {
        throw new ForbiddenException('No existing customer with that phone number!');
      }

      // compare the password
      const passwordMatches = await argon.verify(customer.password, password);
      if (!passwordMatches) {
        throw new ForbiddenException('Password is incorrect');
      }
      const access_token = await this.signToken(customer.id, phoneNumber);
      delete customer.password;
      return { customer: { ...customer }, ...access_token };
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const customers = await this.prismaService.customer.findMany({include: { orders: true}})
      return customers
    } catch (error) {
      console.log("Error", error)
      throw error
    }
  }

  async findOne(phoneNumber: string) {
    try {
      const customer = await this.prismaService.customer.findUnique({ where: {
        phoneNumber
      }})
      return customer
    } catch (error) {
      console.log("Error", error)
      throw error
    }
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async signToken(
    userId: string,
    phoneNumber: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      phoneNumber,
    };
    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: this.configService.get('JWT_SECRET'),
    });
    return { access_token };
  }
}
