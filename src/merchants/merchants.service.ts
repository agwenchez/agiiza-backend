import { Injectable } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MerchantsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createMerchantDto: CreateMerchantDto) {
    const { categories, tags, ...merchantData } = createMerchantDto;

    // const {
    //   firstName,
    //   lastName,
    //   nearbyLandmark,
    //   phoneNumber,
    //   storeName,
    //   storeAddress,
    //   categories,
    //   tags,
    //   email,
    // } = createMerchantDto;
    try {
      const newMerchant = await this.prismaService.merchants.create({
        data: {
          ...merchantData,
          categories: {
            create: categories.map((categoryName) => ({
              category_name: categoryName,
            })),
          },
          tags: {
            create: tags.map((tagName) => ({
              tag_name: tagName,
            })),
          },
        },
        include: {
          categories: true,
          tags: true,
        },
      });
      return newMerchant;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const merchants = await this.prismaService.merchants.findMany();
      return merchants;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const merchants = await this.prismaService.merchants.findUnique({
        where: { id },
      });
      return merchants;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async update(id: string, updateMerchantDto: UpdateMerchantDto) {
    return `This action updates a #${id} merchant`;
  }

  remove(id: string) {
    return `This action removes a #${id} merchant`;
  }
}
