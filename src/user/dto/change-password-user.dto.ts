import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  readonly senha_atual: string;
  @IsString()
  @IsNotEmpty()
  readonly nova_senha: string;
  @IsString()
  @IsNotEmpty()
  readonly confirma_senha: string;
}
