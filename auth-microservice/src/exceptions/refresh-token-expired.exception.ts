import { BadRequestException } from '@nestjs/common';

export class RefreshTokenExpiredException extends BadRequestException {
  constructor(error?: string) {
    super('error.refresh_token_expierd', error);
  }
}
