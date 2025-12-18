import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthLoginService } from './auth-login/auth-login.service';

@Module({
  controllers: [AuthController],
  providers: [AuthLoginService],
})
export class AuthModule {}
