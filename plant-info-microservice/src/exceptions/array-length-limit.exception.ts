import { BadRequestException } from '@nestjs/common';

export class ArrayLengthLimitException extends BadRequestException {
  constructor(fieldName: string, arrayLengthLimit: number) {
    super(
      `Maximum length of array field '${fieldName}' is ${arrayLengthLimit}`,
    );
  }
}
