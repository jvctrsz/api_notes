import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserService } from './services/create-user/create-user.service';
import { FindAllUserService } from './services/find-all-user/find-all-user.service';
import { FindOneUserService } from './services/find-one-user/find-one-user.service';
import { DeleteUserService } from './services/delete-user/delete-user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserService } from './services/update-user/update-user.service';
import { ChangePasswordService } from './services/change-password/change-password.service';
import { ChangePasswordDto } from './dto/change-password-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly findAllUser: FindAllUserService,
    private readonly findOneUser: FindOneUserService,
    private readonly deleteUser: DeleteUserService,
    private readonly updateUser: UpdateUserService,
    private readonly changePasswordUser: ChangePasswordService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUser.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUser.update(+id, updateUserDto);
  }

  @Get()
  findAll() {
    return this.findAllUser.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneUser.findOne(+id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteUser.delete(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  changePassword(
    @Param() id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.changePasswordUser.changePassword(+id, changePasswordDto);
  }
}
