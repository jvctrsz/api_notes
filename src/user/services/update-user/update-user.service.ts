import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindOneUserService } from '../find-one-user/find-one-user.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class UpdateUserService {
  constructor(
    private prisma: PrismaService,
    private findOneUser: FindOneUserService,
  ) {}
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOneUser.findOne(id);
    if (!user) throw new NotFoundException('Usuário não encontrado.');

    const { username } = updateUserDto;
    const hasSameName = await this.prisma.user.findUnique({
      where: { username, AND: { id: { not: id } } },
    });
    if (!!hasSameName)
      throw new ConflictException('Já existe um usuário com este nome.');

    const updated = await this.prisma.user.update({
      where: { id },
      data: { username },
      omit: { password: true },
    });
    return updated;
  }
}
