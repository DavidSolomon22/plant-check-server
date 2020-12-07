import { Body, Controller, Post, Req, UseGuards, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { RegisterDto } from 'modules/auth/dtos';
import { AuthService } from 'modules/auth/services';
import { LocalAuthGuard } from 'guards';
import { User } from 'modules/user/schemas';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return await this.authService.registerUser(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request): Promise<any> {
    const { accessToken, refreshToken } = await this.authService.generateTokens(
      req.user,
    );
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  @Post('refresh')
  async refresh(): Promise<any> {
    return 'any';
  }
}
