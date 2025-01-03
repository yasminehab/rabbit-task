import { Controller, Get, Post, Body, Param, Query, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';


@Controller('products')
@UseInterceptors(CacheInterceptor)

export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  @CacheTTL(300)
  async getAllProducts(@Query() filters: GetAllProductsDTO) {

    return this.productsService.getAllProducts(filters);
  }

  @Get('categories')
  @CacheTTL(3600) 
  async getCategories() {
    return this.productsService.getCategories();
  }

  @Get(':id')
  @CacheTTL(300) 
  async getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(Number(id));
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }
}
