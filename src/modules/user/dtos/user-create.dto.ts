import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  passwordHash: string;

  @IsString()
  firstName: string;

  @IsString()
  surname: string;
}
