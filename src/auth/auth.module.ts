import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthLoginService } from './auth-login/auth-login.service';
import { FindOneUserService } from 'src/user/services/find-one-user/find-one-user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthLoginService, FindOneUserService],
})
export class AuthModule {}
