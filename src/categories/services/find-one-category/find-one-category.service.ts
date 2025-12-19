import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindOneCategoryService {
  constructor(private prisma: PrismaService) {}
  async findOne(categoriesWhereUniqueInput: Prisma.CategoriesWhereUniqueInput) {
    const users = await this.prisma.categories.findUnique({
      where: categoriesWhereUniqueInput,
      include: { notes: true },
    });
    if (!users) throw new NotFoundException('Categoria não encontrada.');
    return users;
  }
}
