import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDTO } from './dto/create-order-dto';


@Injectable()
export class OrderRepository {
  constructor(private prisma: PrismaService) {}


  async create(data: CreateOrderDTO) {
    return this.prisma.order.create({
      data: {
        customerId: data.customerId,
        items: {
          create: data.items.map(item => ({
            quantity: item.quantity,
            product: { connect: { id: item.productId } }
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
  }
  async getTopProducts(area: string, limit: number = 10) {
    return this.prisma.orderItem.groupBy({
      by: ['productId'],
      where: {
        product: {
          area: area
        }
      },
      _sum: {
        quantity: true
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: limit,
    });
  }

}
