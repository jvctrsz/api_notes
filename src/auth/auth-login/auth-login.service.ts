import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from '../dto/auth-login.dto';
import { verify } from 'argon2';
import { FindOneUserService } from 'src/user/services/find-one-user/find-one-user.service';

const message = 'Credenciais inválidas.';

@Injectable()
export class AuthLoginService {
  constructor(
    private readonly findOneService: FindOneUserService,
    private readonly jwtService: JwtService,
  ) {}
  async authLogin(authLoginDto: AuthLoginDto) {
    const { password, username } = authLoginDto;
    const user = await this.findOneService.findOne({ username }, false, true);
    if (!user) throw new UnauthorizedException(message);
    const isValidPassword = await verify(user.password, password);
    if (!isValidPassword) throw new UnauthorizedException(message);

    const payload = { id: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_LOGIN,
    });
    return { token };
  }
}
