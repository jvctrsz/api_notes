import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindAllCategoryService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    const categories = await this.prisma.categories.findMany({
      orderBy: { id: 'asc' },
    });
    return categories;
  }
}
