import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { IsPublic } from 'src/Decorators';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthLoginService } from './services/auth-login/auth-login.service';
import { AuthRegisterService } from './services/auth-register/auth-register.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(
    private authLoginService: AuthLoginService,
    private authRegisterLogin: AuthRegisterService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  authLogin(@Body() authLoginDto: AuthLoginDto) {
    return this.authLoginService.authLogin(authLoginDto);
  }

  @Post('register')
  authRegister(@Body() createUserDto: CreateUserDto) {
    return this.authRegisterLogin.authRegister(createUserDto);
  }
}
