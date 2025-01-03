import { Body, Controller, Post, Get, Query, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order-dto';
import { TopProductsDto } from './dto/top-products.dto';

@Controller('order')
@UseInterceptors(CacheInterceptor)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() data: CreateOrderDTO) {
    return this.orderService.create(data)
  }

  @Get('top-products')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(3600) 
  async getTopProducts(@Query() topProductsDto: TopProductsDto) {
    return this.orderService.getTopProducts(topProductsDto.area);
  }
  
}
