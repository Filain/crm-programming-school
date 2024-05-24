import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';

import { AppModule } from './app.module';
import { ERole } from './common/enums/role.enum';
import { AppConfig, Config } from './configs/config.type';
import { SignUpRequestDto } from './modules/auth/dto/request/sign-up.request.dto';
import { AuthService } from './modules/auth/services/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      credentials: true,
      origin: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('School request API')
    .setDescription('by Volodymyr Fylypiv')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 3,
      persistAuthorization: true,
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //- цей параметр вказує, що дані будуть автоматично перетворюватись до відповідного типу.
      forbidNonWhitelisted: true, //- вказує, що будь-які поля, які не вказані в схемі (білому списку), будуть заборонені.
      whitelist: true, // -- вказує, що будь-які поля, які не вказані в схемі (білому списку), будуть відфільтровані та видалені.
    }),
  );
  const appAdminCreate = app.get(AuthService);

  const adminData: SignUpRequestDto = {
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'admin',
    role: ERole.ADMIN,
  };
  const ifAdmin = await appAdminCreate.isAdmin(adminData.email);
  if (!ifAdmin) {
    await appAdminCreate.signUp(adminData);
    Logger.log('Admin  created successfully.');
  }

  const configService = app.get(ConfigService<Config>);
  const appConfig = configService.get<AppConfig>('app');
  await app.listen(appConfig.port, () => {
    Logger.log(`Server running http://localhost:${appConfig.port}/`);
    Logger.log(`Swagger running http://localhost:${appConfig.port}/docs`);
  });
}
void bootstrap();
