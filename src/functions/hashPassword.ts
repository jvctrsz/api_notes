import { InternalServerErrorException } from '@nestjs/common';
import { hash, argon2id } from 'argon2';

export class HashFunctions {
  async hashPassword(password: string) {
    try {
      const hashed = await hash(password, {
        type: argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
        parallelism: 1,
      });
      return hashed;
    } catch {
      throw new InternalServerErrorException(
        'Não foi possível fazer o hash da senha.',
      );
    }
  }
}
