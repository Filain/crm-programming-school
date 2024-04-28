import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/configs/config';

import { HealthModule } from './health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { MysqlModule } from './modules/mysql/mysql.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    HealthModule,
    MysqlModule,

    RepositoryModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
