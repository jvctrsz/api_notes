import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthLoginDto } from '../dto/auth-login.dto';
import { verify } from 'argon2';

const message = 'Credenciais inválidas.';

@Injectable()
export class AuthLoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async authLogin(authLoginDto: AuthLoginDto) {
    const { password, username } = authLoginDto;
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) throw new UnauthorizedException(message);

    const isValidPassword = verify(password, user.password);
    if (!isValidPassword) throw new UnauthorizedException(message);

    const payload = { id: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_LOGIN,
    });
    return { token };
  }
}
