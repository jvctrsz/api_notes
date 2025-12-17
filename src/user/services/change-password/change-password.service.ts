import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindOneUserService } from '../find-one-user/find-one-user.service';
import { ChangePasswordDto } from 'src/user/dto/change-password-user.dto';
import { verify } from 'argon2';
import { HashFunctions } from 'src/functions/hashPassword';

@Injectable()
export class ChangePasswordService {
  constructor(
    private prisma: PrismaService,
    private findOneUser: FindOneUserService,
    private hashFunctions: HashFunctions,
  ) {}
  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    const user = await this.findOneUser.findOne(id, false);
    if (!user) throw new NotFoundException('Usuário não encontrado.');

    const { confirma_senha, nova_senha, senha_atual } = changePasswordDto;

    const checkCurrent = await verify(senha_atual, user.password);
    if (!checkCurrent) throw new ConflictException('Senha atual inválida.');
    if (nova_senha === senha_atual)
      throw new BadRequestException(
        'Nova senha e senha atual não devem ser iguais.',
      );
    if (nova_senha !== confirma_senha)
      throw new BadRequestException(
        'Nova senha e confirma senha devem ser iguais.',
      );

    const hashed = await this.hashFunctions.hashPassword(nova_senha);
    await this.prisma.user.update({
      where: { id },
      data: { password: hashed },
    });
    return { message: 'Senha alterada com sucesso.' };
  }
}
