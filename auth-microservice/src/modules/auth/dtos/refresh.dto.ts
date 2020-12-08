import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty()
  access_token: string;

  @IsNotEmpty()
  refresh_token: string;
}
