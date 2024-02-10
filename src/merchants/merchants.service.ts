import { Injectable } from '@nestjs/common';
import {
  CreateMerchantDto,
  CreateMerchantLocationDto,
} from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import * as argon from 'argon2';
// import {prisma} from '../extendedPrismaClient';

@Injectable()
export class MerchantsService {
  constructor(
    private readonly prismaService: PrismaService,
    private categoryService: CategoriesService,
  ) {}
  async create(createMerchantDto: CreateMerchantDto) {
    let hash = await argon.hash(createMerchantDto.password);
    const {
      categories,
      tags,
      lat,
      lng,
      nearbyLandmarkLat,
      nearbyLandmarkLng,
      firstName,
      lastName,
      storeName,
      storeAddress,
      email,
      password,
      phoneNumber,
      description,
      role,
    } = createMerchantDto;
    console.log('Merchant', createMerchantDto);
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
          firstName,
          lastName,
          storeName,
          storeAddress,
          email,
          password : hash,
          phoneNumber,
          description,
          role,
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
      // console.log('New merchant ID', newMerchant.id);
      const merchantLocationBody = {
        merchantId: newMerchant.id,
        lat,
        lng,
      };
      await this.createMerchantLocation(merchantLocationBody);
      const merchantNearbyLandmarkBody = {
        merchantId: newMerchant.id,
        lat: nearbyLandmarkLat,
        lng: nearbyLandmarkLng,
      };
      await this.createMerchanNearbyLandmark(merchantNearbyLandmarkBody);
      return newMerchant;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  createMerchantLocation = async (
    createMerchantLocationDto: CreateMerchantLocationDto,
  ) => {
    const { merchantId, lat, lng } = createMerchantLocationDto;
    try {
      const newMerchantLocation =
        await this.prismaService.merchantLocation.create({
          data: {
            merchantId,
            lat,
            lng,
          },
        });

      // console.log('New merchant location', newMerchantLocation);
      return newMerchantLocation;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  };
  createMerchanNearbyLandmark = async (
    createMerchantLocationDto: CreateMerchantLocationDto,
  ) => {
    const { merchantId, lat, lng } = createMerchantLocationDto;
    try {
      const newMerchantNearbyLandmark =
        await this.prismaService.merchantNearbyLandmark.create({
          data: {
            merchantId,
            lat,
            lng,
          },
        });

      // console.log('New merchant nearbyLandmark', newMerchantNearbyLandmark);
      return newMerchantNearbyLandmark;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  };

  async findAll() {
    try {
      const merchants = await this.prismaService.merchant.findMany({
        include: { categories: true, tags: true },
      });
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
    const { categories, tags, ...updateMerchantData } = updateMerchantDto;
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
      const updatedMerchant = await this.prismaService.merchant.update({
        where: { id },
        data: {
          ...updateMerchantData,
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
      return updatedMerchant;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }
  async remove(id: string) {
    try {
      const deletedMerchant = await this.prismaService.merchant.delete({
        where: { id },
      });
      return deletedMerchant;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }
}
