import { Document } from 'mongoose';
import { classToPlain, plainToClass } from 'class-transformer';

declare type ClassType<T> = {
  new (...args: any[]): T;
};

export function toDTO<T, V>(classType: ClassType<T>, document: Document<V>): T {
  const leanDocument = document.toJSON();
  const plainObject = classToPlain(leanDocument);
  return plainToClass(classType, plainObject);
}
