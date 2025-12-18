import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthLoginService } from './auth-login/auth-login.service';
import { IsPublic } from 'src/Decorators';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authLoginService: AuthLoginService) {}

  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @Post('login')
  authLogin(@Body() authLoginDto: AuthLoginDto) {
    return this.authLoginService.authLogin(authLoginDto);
  }
}
