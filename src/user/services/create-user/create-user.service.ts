import { ConflictException, Injectable } from '@nestjs/common';
import { HashFunctions } from 'src/functions/hashPassword';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class CreateUserService {
  constructor(
    private prisma: PrismaService,
    private hashFunctions: HashFunctions,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { username, password, name } = createUserDto;
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!!user) throw new ConflictException('Usuário já cadastrado.');

    const hashed = await this.hashFunctions.hashPassword(password);
    const created = await this.prisma.user.create({
      data: { username, password: hashed, name },
      omit: { password: true },
    });
    return created;
  }
}
