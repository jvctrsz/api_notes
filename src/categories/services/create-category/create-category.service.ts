import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CreateCategoryService {
  constructor(private prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.prisma.categories.create({
      data: createCategoryDto,
    });
    return category;
  }
}
