import { BadRequestException } from '@nestjs/common';

export class FileFieldRequiredException extends BadRequestException {
  constructor(fieldName: string) {
    super(`File field '${fieldName}' required`);
  }
}
