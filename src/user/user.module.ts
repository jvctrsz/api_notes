import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserService } from './services/create-user/create-user.service';
import { UpdateUserService } from './services/update-user/update-user.service';
import { FindOneUserService } from './services/find-one-user/find-one-user.service';
import { FindAllUserService } from './services/find-all-user/find-all-user.service';
import { DeleteUserService } from './services/delete-user/delete-user.service';
import { HashFunctions } from 'src/functions/hashPassword';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserService,
    UpdateUserService,
    FindOneUserService,
    FindAllUserService,
    DeleteUserService,
    HashFunctions,
  ],
})
export class UserModule {}
