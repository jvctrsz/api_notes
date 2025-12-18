import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateUserService } from 'src/user/services/create-user/create-user.service';
import { FindOneUserService } from 'src/user/services/find-one-user/find-one-user.service';

@Injectable()
export class AuthRegisterService {
  constructor(
    private createUserService: CreateUserService,
    private findOneService: FindOneUserService,
    private jwtService: JwtService,
  ) {}
  async authRegister(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const user = await this.findOneService.findOne(
      { username },
      undefined,
      true,
    );
    if (!!user) throw new ConflictException('Username não esta disponivel.');
    const created = await this.createUserService.create(createUserDto);
    const payload = { id: created.id, username: created.username };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_LOGIN,
    });
    return { token };
  }
}
