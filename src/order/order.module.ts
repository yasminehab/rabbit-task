import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductModule } from '../product/product.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ProductModule, PrismaModule],
  controllers: [OrderController],
  providers: [PrismaService,  OrderService, OrderRepository],
})
export class OrderModule {}
