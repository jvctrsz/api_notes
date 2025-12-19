import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindOneUserService {
  constructor(private prisma: PrismaService) {}
  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    omitPassword = true,
    ignoreValidation = false,
  ) {
    const users = await this.prisma.user.findUnique({
      where: { ...userWhereUniqueInput, AND: { isDeleted: { equals: false } } },
      omit: { password: omitPassword, isDeleted: true, deleted_at: true },
    });
    if (!users && !ignoreValidation)
      throw new NotFoundException('Usuário não encontrado.');
    return users;
  }
}
