import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindOneCategoryService } from '../find-one-category/find-one-category.service';

@Injectable()
export class DeleteCategoryService {
  constructor(
    private prisma: PrismaService,
    private findOneCategoryService: FindOneCategoryService,
  ) {}
  async delete(id: number) {
    const category = await this.findOneCategoryService.findOne({ id });
    if (category.notes.some(({ status }) => status !== 'finished'))
      throw new ConflictException(
        'Não foi possível deletar esta categoria, há notas vinculadas a ela.',
      );
    await this.prisma.categories.delete({ where: { id } });
    return { message: 'Categoria deletada com sucesso.' };
  }
}
