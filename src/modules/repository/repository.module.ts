import { Global, Module } from '@nestjs/common';

import { GroupRepository } from './services/group.repository';
import { OrderRepository } from './services/order.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    RefreshTokenRepository,
    UserRepository,
    OrderRepository,
    GroupRepository,
  ],
  exports: [
    RefreshTokenRepository,
    UserRepository,
    OrderRepository,
    GroupRepository,
  ],
})
export class RepositoryModule {}
