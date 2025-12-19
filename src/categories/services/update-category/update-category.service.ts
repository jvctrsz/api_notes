import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindOneCategoryService } from '../find-one-category/find-one-category.service';
import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto';

@Injectable()
export class UpdateCategoryService {
  constructor(
    private prisma: PrismaService,
    private findOneCategoryService: FindOneCategoryService,
  ) {}
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOneCategoryService.findOne({ id });
    const { name } = updateCategoryDto;
    const updated = await this.prisma.categories.update({
      where: { id },
      data: { name },
    });
    return updated;
  }
}
