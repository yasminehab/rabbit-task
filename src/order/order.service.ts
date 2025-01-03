import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order-dto';
import { OrderRepository } from './order.repository';
import { ProductRepository } from '../product/product.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async create(orderData: CreateOrderDTO) {
    return this.orderRepository.create(orderData);
  }

  async getTopProducts(area: string) {
    const topProducts = await this.orderRepository.getTopProducts(area);
    const productIds = topProducts.map(product => product.productId);
    const products = await this.productRepository.findManyByIds(productIds);

    return products.map(product => ({
      ...product,
      totalQuantity: topProducts.find(tp => tp.productId === product.id)._sum.quantity
    }));
  }
}