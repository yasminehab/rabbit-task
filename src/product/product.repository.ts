import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetAllProductsDTO } from './dto/get-all-products.dto';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(filters: GetAllProductsDTO): Promise<{ products: any[], total: number }> {
    const { page = 1, limit = 20, category, area, search, sort } = filters;
    const skip = (page - 1) * Number(limit);
    const take = Number(limit);

    const where: any = {
      ...(category && { category: { contains: category, mode: 'insensitive' } }),
      ...(area && { area }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    let orderBy: any = { createdAt: 'desc' };
    if (sort) {
      const [field, direction] = sort.split('_');
      orderBy = { [field]: direction.toLowerCase() };
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prisma.product.count({ where }),
    ]);

    return { products, total };
  }

  async findManyByIds(ids: number[]): Promise<any[]> {
    return this.prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
  async findById(id: number): Promise<any | null >  {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create(data: { name: string; category: string; area: string }): Promise<any> {
    return this.prisma.product.create({ data });
  }
  async getCategories(): Promise<string[]> {
    const categories = await this.prisma.product.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
    });
    return categories.map(c => c.category);
  }
}

