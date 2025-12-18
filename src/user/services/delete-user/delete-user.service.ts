import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindOneUserService } from '../find-one-user/find-one-user.service';

@Injectable()
export class DeleteUserService {
  constructor(
    private prisma: PrismaService,
    private findOneUser: FindOneUserService,
  ) {}
  async delete(id: number) {
    const user = await this.findOneUser.findOne({ id });
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    await this.prisma.user.delete({ where: { id } });
    return { message: 'Usuário deletado com sucesso.' };
  }
}
