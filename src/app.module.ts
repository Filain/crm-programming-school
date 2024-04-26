import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/configs/config';

import { HealthModule } from './health/health.module';
import { MysqlModule } from './modules/mysql/mysql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    HealthModule,
    MysqlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
