import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../../../database/entities/user.entity';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { SignInRequestDto } from '../dto/request/sign-in.request.dto';
import { SignUpRequestDto } from '../dto/request/sign-up.request.dto';
import { AuthUserResponseDto } from '../dto/response/auth-user.response.dto';
import { TokenResponseDto } from '../dto/response/token.response.dto';
import { TokenType } from '../enums/token-type.enum';
import { AuthMapper } from './auth.mapper';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly refreshRepository: RefreshTokenRepository,
  ) {}

  public async signUp(dto: SignUpRequestDto): Promise<AuthUserResponseDto> {
    await this.isEmailUniqueOrThrow(dto.email);
    const password = await bcrypt.hash(dto.password, 8);

    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
    });

    await this.refreshRepository.saveToken(user.id, tokens.refreshToken);

    return AuthMapper.toResponseDto(user, tokens);
  }

  public async signIn(dto: SignInRequestDto): Promise<AuthUserResponseDto> {
    const userEntity = await this.userRepository.findOne({
      where: { email: dto.email },
      select: { id: true, password: true },
    });
    if (!userEntity) {
      throw new UnauthorizedException('SignIn error user not found');
    }

    const isPasswordsMatch = await bcrypt.compare(
      dto.password,
      userEntity.password,
    );

    if (!isPasswordsMatch) {
      throw new UnauthorizedException('Incorrect password or email');
    }

    const user = await this.userRepository.findOneBy({ id: userEntity.id });

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
    });

    await this.refreshRepository.delete({ user_id: user.id });
    await this.refreshRepository.saveToken(user.id, tokens.refreshToken);

    return AuthMapper.toResponseDto(user, tokens);
  }

  //---------------------logout---------------------------

  public async logout(refreshToken: string): Promise<void> {
    await this.refreshRepository.delete({ refreshToken });
  }

  //---------------------refreshToken---------------------------

  public async refreshToken(refreshToken: string): Promise<TokenResponseDto> {
    if (!refreshToken) {
      throw new UnauthorizedException('refreshToken not found');
    }

    const payload = await this.tokenService.verifyToken(
      refreshToken,
      TokenType.REFRESH,
    );

    await this.refreshRepository.delete({
      user_id: payload.userId,
    });

    const tokens = await this.tokenService.generateAuthTokens({
      userId: payload.userId,
    });

    await this.refreshRepository.saveToken(payload.userId, tokens.refreshToken);
    return tokens;
  }

  public async isAdmin(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  private async isEmailUniqueOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email already exists');
    }
  }
}
