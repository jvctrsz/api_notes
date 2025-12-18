import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;
  @IsString()
  @IsOptional()
  readonly name: string;
}
