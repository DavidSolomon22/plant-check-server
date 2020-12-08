import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RefreshTokenDto, RegisterDto } from 'modules/auth/dtos';
import { AuthService } from 'modules/auth/services';
import { LocalAuthGuard } from 'guards';
import { User } from 'decorators';
import { UserParam } from 'common/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    return await this.authService.registerUser(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: UserParam): Promise<any> {
    return this.authService.generateTokens(user);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<RefreshTokenDto> {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
