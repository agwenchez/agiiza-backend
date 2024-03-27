import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.prismaService.category.create({
        data: {
          categoryName: createCategoryDto.categoryName,
        },
      });
      return newCategory;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const categories = await this.prismaService.category.findMany({});
      return categories;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async findOne(categoryName: string) {
    try {
      const category = await this.prismaService.category.findUnique({
        where: { categoryName },
      });
      return category;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updateCategory = await this.prismaService.category.update({
        where: { id },
        data: { categoryName: updateCategoryDto.categoryName },
      });
      return updateCategory;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const removeCategory = await this.prismaService.category.delete({
        where: { id },
      });
      return removeCategory;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }
}
