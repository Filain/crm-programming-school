import { Global, Module } from '@nestjs/common';

import { OrderRepository } from './services/order.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [RefreshTokenRepository, UserRepository, OrderRepository],
  exports: [RefreshTokenRepository, UserRepository, OrderRepository],
})
export class RepositoryModule {}
