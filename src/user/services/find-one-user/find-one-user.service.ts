import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindOneUserService {
  constructor(private prisma: PrismaService) {}
  async findOne(id: number) {
    const users = await this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
    if (!users) throw new NotFoundException('Usuário não encontrado.');
    return users;
  }
}
