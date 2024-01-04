import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.prismaService.categories.create({
        data: {
          category_name: createCategoryDto.category_name,
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
      const categories = await this.prismaService.categories.findMany({});
      return categories;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  // async findOne(id: string) {
  //   return `This action returns a #${id} category`;
  // }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updateCategory = await this.prismaService.categories.update({
        where: { id },
        data: { category_name: updateCategoryDto.category_name },
      });
      return updateCategory;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const removeCategory = await this.prismaService.categories.delete({
        where: { id },
      });
      return removeCategory;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }
}
