import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { SignInRequestDto } from '../dto/request/sign-in.request.dto';
import { SignUpRequestDto } from '../dto/request/sign-up.request.dto';
import { AuthUserResponseDto } from '../dto/response/auth-user.response.dto';
import { TokenResponseDto } from '../dto/response/token.response.dto';
import { IUserData } from '../interfaces/user-data.interface';
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
    const password = await bcrypt.hash(dto.password, 8);

    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
    });

    await Promise.all([
      this.refreshRepository.saveToken(user.id, tokens.refreshToken),
    ]);

    return AuthMapper.toResponseDto(user, tokens);
  }

  public async signIn(dto: SignInRequestDto): Promise<AuthUserResponseDto> {
    const userEntity = await this.userRepository.findOne({
      where: { email: dto.email },
      select: { id: true, password: true },
    });
    if (!userEntity) {
      throw new UnauthorizedException();
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

  public async logout(userData: IUserData): Promise<void> {
    await this.refreshRepository.delete({ user_id: userData.userId });
  }

  public async refreshToken(userData: IUserData): Promise<TokenResponseDto> {
    const user = await this.userRepository.findOneBy({
      id: userData.userId,
    });
    // console.log('userData.userId', userData.userId);

    await this.refreshRepository.delete({ user_id: user.id });

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
    });

    await this.refreshRepository.saveToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
