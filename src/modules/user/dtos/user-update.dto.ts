import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  surname: string;
}
