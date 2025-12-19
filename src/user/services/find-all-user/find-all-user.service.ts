import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindAllUserService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    const users = await this.prisma.user.findMany({
      where: { isDeleted: { equals: false } },
      omit: { password: true, isDeleted: true, deleted_at: true },
      orderBy: { id: 'asc' },
    });
    return users;
  }
}
