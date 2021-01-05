import { Injectable } from '@nestjs/common';
import { UserService } from 'modules/user/services';
import { RefreshTokenDto, RegisterDto } from '../dtos';
import { hash, compare } from 'bcrypt';
import { User } from 'modules/user/schemas';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UtilsService } from 'utils/services';
import { TokenExpiredError } from 'jsonwebtoken';
import { RefreshTokenExpiredException } from 'exceptions';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private accessTokenExpTime = '5m';
  private refreshTokenExpTime = '8h';

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getOneByEmailWithHash(email);
    if (user && (await compare(password, user.passwordHash))) {
      delete user.passwordHash;
      return user;
    }
    return null;
  }

  async validateToken(token: string, secret: string): Promise<any> {
    return this.jwtService.verifyAsync(token, {
      ignoreExpiration: false,
      secret: secret,
    });
  }

  async validateAccessTokenExpiration(
    token: string,
    secret: string,
  ): Promise<any> {
    let tokenPayload = null;
    try {
      tokenPayload = await this.validateToken(token, secret);
    } catch (accessTokenError) {
      if (!(accessTokenError instanceof TokenExpiredError)) {
        throw accessTokenError;
      } else {
        return tokenPayload;
      }
    }
  }

  async validateRefreshTokenExpiration(
    token: string,
    secret: string,
  ): Promise<any> {
    try {
      const tokenPayload = await this.validateToken(token, secret);
      return tokenPayload;
    } catch (refreshTokenError) {
      if (refreshTokenError instanceof TokenExpiredError) {
        throw new RefreshTokenExpiredException();
      } else {
        throw refreshTokenError;
      }
    }
  }

  async generateTokens({ userId, email }: any) {
    const accessTokenPayload = { userId, email };
    const refreshTokenPayload = { userId, email };
    return {
      access_token: this.jwtService.sign(accessTokenPayload, {
        expiresIn: this.accessTokenExpTime,
      }),
      refresh_token: this.jwtService.sign(refreshTokenPayload, {
        expiresIn: this.refreshTokenExpTime,
      }),
      userId,
    };
  }

  async registerUser(user: RegisterDto): Promise<User> {
    const { password } = user;
    const passwordHash = await hash(password, 10);
    const userForCreation: any = { ...user, passwordHash };
    return await this.userService.createUser(userForCreation);
  }

  async refreshToken({
    access_token,
    refresh_token,
  }: RefreshTokenDto): Promise<RefreshTokenDto> {
    const secret = this.configService.get<string>('JWT_SECRET');
    await this.validateAccessTokenExpiration(access_token, secret);
    const refreshTokenPayload = await this.validateRefreshTokenExpiration(
      refresh_token,
      secret,
    );
    return this.generateTokens(refreshTokenPayload);
  }

  jwtCookieExtractor(req: any, cookieName: string): string {
    let token = null;
    if (req && req.headers && req.headers.cookie) {
      token = UtilsService.getCookie(req.headers.cookie, cookieName);
    }
    return token;
  }
}
