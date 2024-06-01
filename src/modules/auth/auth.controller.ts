import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { Config, JWTConfig } from '../../configs/config.type';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { SignInRequestDto } from './dto/request/sign-in.request.dto';
import { SignUpRequestDto } from './dto/request/sign-up.request.dto';
import { AuthUserResponseDto } from './dto/response/auth-user.response.dto';
import { TokenResponseDto } from './dto/response/token.response.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@ApiTags('Auth')
@Controller({ path: 'auth' })
export class AuthController {
  private jwtConfig: JWTConfig;
  constructor(
    private authService: AuthService,
    private configService: ConfigService<Config>,
  ) {
    this.jwtConfig = this.configService.get<JWTConfig>('jwt');
  }

  // @ApiBearerAuth()
  @SkipAuth()
  @ApiOperation({ summary: 'Registration' })
  @Post('sign-up')
  public async signUp(
    @Body() dto: SignUpRequestDto,
  ): Promise<AuthUserResponseDto> {
    return await this.authService.signUp(dto);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Login' })
  @Post('sign-in')
  public async signIn(
    @Body() dto: SignInRequestDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthUserResponseDto> {
    const token = await this.authService.signIn(dto);
    res.cookie('refreshToken', token.tokens.refreshToken, {
      maxAge: 24 * 60 * 60 * 1000, // Час життя cookie
      httpOnly: true,
    });
    return token;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout' })
  @Post('logout')
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const refreshToken = req.get('cookie')?.split('refreshToken=')[1];
    const token = await this.authService.logout(refreshToken);
    res.cookie('refreshToken', '', {
      expires: new Date(0),
      httpOnly: true,
    });
  }

  @SkipAuth()
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: 'Update token pair' })
  @Post('refresh')
  public async updateRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenResponseDto> {
    try {
      // Отримання refresh token з cookie
      const refreshToken = req.get('cookie')?.split('refreshToken=')[1];
      // Виклик методу сервісу для оновлення токену
      const token = await this.authService.refreshToken(refreshToken);
      // Запис нового refresh token в кукі (якщо потрібно)
      res.cookie('refreshToken', token.refreshToken, {
        httpOnly: true, // Обмежує доступ до кукі тільки через HTTP(S)
        maxAge: 24 * 60 * 60 * 1000, // Час життя cookie
        // secure: true, // Встановлює кукі тільки через HTTPS
        // sameSite: 'strict', // Захищає від CSRF атак
      });
      return token;
    } catch (error) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }
}
