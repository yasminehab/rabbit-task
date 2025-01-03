import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productsRepository: ProductRepository,
    private prismaService: PrismaService,
  ) {}

  async getAllProducts(filters: GetAllProductsDTO): Promise<ProductDTO[]> {
    if (filters.category && filters.category.length) {
      const products = [];
      for (let i = 0; i < filters.category.length; i++) {
        products.push(
          await this.prismaService.product.findFirst({
            where: { category: filters.category[i] },
          }),
        );
      }
      return products;
    }
    return this.prismaService.product.findMany();
  }

  async getProductById(id: number): Promise<ProductDTO> {
    return this.productsRepository.findById(id);
  }
  async createProduct(createProductDto: CreateProductDto): Promise<ProductDTO> {
    return this.productsRepository.create(createProductDto);
  }
  async getCategories(): Promise<string[]> {
    return this.productsRepository.getCategories();
  }
}
