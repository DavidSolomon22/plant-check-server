import { Body, Controller, Post, Req, UseGuards, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserDto } from 'modules/user/dtos';
import { RegisterDto } from 'modules/auth/dtos';
import { AuthService } from 'modules/auth/services';
import { LocalAuthGuard } from 'guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<UserDto> {
    return await this.authService.registerUser(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response): Promise<any> {
    const { accessToken, refreshToken } = await this.authService.generateTokens(
      req.user,
    );
    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true });
    res.status(200).json(req.user);
  }
}
