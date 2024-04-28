import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Module({
  controllers: [AuthController],
  imports: [JwtModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
    AuthService,
    TokenService,
    UserService,
  ],
  exports: [],
})
export class AuthModule {}
