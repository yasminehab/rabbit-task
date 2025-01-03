import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheModule } from '../cache/cache.module';
import { PrismaModule } from '../prisma/prisma.module';


@Module({
  imports: [ CacheModule, PrismaModule],
  controllers: [ProductController],
  providers: [PrismaService, ProductService, ProductRepository],
  exports: [ProductService, ProductRepository],

})
export class ProductModule {}
