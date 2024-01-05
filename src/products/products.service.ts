import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { prices, merchantId, ...productData } = createProductDto;

    try {
      // Create product with basic information
      const createdProduct = await this.prismaService.product.create({
        data: {
          ...productData,
          merchant: {
            connect: { id: merchantId },
          },
          prices: {
            create: prices.map((price) => ({
              ...price,
            })),
          },
        },
        include: {
          prices: true,
        },
      });

      return createdProduct;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const products = await this.prismaService.product.findMany({
        include: {
          prices: true,
        },
      });
      return products;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async findOne(productId: string) {
    try {
      const product = await this.prismaService.product.findUnique({
        where: { id: productId },
        include: {
          prices: true,
        },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }

      return product;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { prices, ...updatedProductData } = updateProductDto;
    try {
      const updatedProduct = await this.prismaService.product.update({
        where: {
          id,
        },
        data: updatedProductData,
        include: {
          prices: true,
        },
      });

      // Update product's prices
      if (prices && prices.length > 0) {
        const updatePricePromises = prices.map(async (price) => {
          if (price.id) {
            return this.prismaService.price.update({
              where: { id: price.id },
              data: {
                value: price.value,
              },
            });
          }
        });

        await Promise.all(updatePricePromises);
      }
      return updatedProduct;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const deletedProduct = await this.prismaService.product.delete({
        where: {
          id,
        },
      });
      return deletedProduct;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }
}
