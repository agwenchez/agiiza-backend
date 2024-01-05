import { Injectable } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

@Injectable()
export class MerchantsService {
  constructor(
    private readonly prismaService: PrismaService,
    private categoryService: CategoriesService,
  ) {}
  async create(createMerchantDto: CreateMerchantDto) {
    const { categories, tags, ...merchantData } = createMerchantDto;
    console.log('Merchant', createMerchantDto);

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
      // Create or find existing categories
      const categoryPromises = categories.map(async (categoryName) => {
        const existingCategory = await this.categoryService.findOne(
          categoryName,
        );

        if (existingCategory) {
          return { id: existingCategory.id };
        } else {
          const createCategoryDto = { category_name: categoryName };
          const createdCategory = await this.categoryService.create(
            createCategoryDto,
          );
          return { id: createdCategory.id };
        }
      });

      const resolvedCategories = await Promise.all(categoryPromises);

      // Create or find existing tags
      const tagPromises = tags.map(async (tagName) => {
        const existingTag = await this.prismaService.tag.findUnique({
          where: { tag_name: tagName },
        });

        if (existingTag) {
          return { id: existingTag.id };
        } else {
          const createdTag = await this.prismaService.tag.create({
            data: {
              tag_name: tagName,
            },
          });
          return { id: createdTag.id };
        }
      });

      const resolvedTags = await Promise.all(tagPromises);

      // Create merchant with basic information and connected categories and tags
      const newMerchant = await this.prismaService.merchant.create({
        data: {
          ...merchantData,
          categories: {
            connect: resolvedCategories,
          },
          tags: {
            connect: resolvedTags,
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
      const merchants = await this.prismaService.merchant.findMany();
      return merchants;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const merchants = await this.prismaService.merchant.findUnique({
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
