import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { TokenType } from '../enums/token-type.enum';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private refreshRepository: RefreshTokenRepository,
    private userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.get('cookie')?.split('refreshToken=')[1];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh guard token not found');
    }

    const payload = await this.tokenService.verifyToken(
      refreshToken,
      TokenType.REFRESH,
    );
    if (!payload) {
      throw new UnauthorizedException('refresh token payload empty');
    }

    const isExist = await this.refreshRepository.isTokenExist(refreshToken);
    if (!isExist) {
      throw new UnauthorizedException('refresh token not found');
    }

    const user = await this.userRepository.findOneBy({
      id: payload.userId,
    });
    if (!user) {
      throw new UnauthorizedException('refresh token user not found');
    }
    request.user = { user };
    return true;
  }
}
