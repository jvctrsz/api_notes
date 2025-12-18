import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { FindOneUserService } from 'src/user/services/find-one-user/find-one-user.service';
import { AuthRegisterService } from './services/auth-register/auth-register.service';
import { AuthLoginService } from './services/auth-login/auth-login.service';
import { HashFunctions } from '../functions/hashPassword';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    AuthLoginService,
    FindOneUserService,
    AuthRegisterService,
    HashFunctions,
  ],
})
export class AuthModule {}
