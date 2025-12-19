import { ConflictException, Injectable } from '@nestjs/common';
import { FindOneCategoryService } from '../find-one-category/find-one-category.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActiveCategoryService {
  constructor(
    private findOneCategoryService: FindOneCategoryService,
    private prisma: PrismaService,
  ) {}
  async active(id: number) {
    const user = await this.findOneCategoryService.findOne({ id });
    if (user.active) throw new ConflictException('Categoria já esta ativa.');
    await this.prisma.categories.update({
      where: { id },
      data: { active: true },
    });
    return { message: 'Categoria ativada com sucesso.' };
  }
}
