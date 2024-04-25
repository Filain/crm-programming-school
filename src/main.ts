import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AppConfig, Config } from './configs/config.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  const configService = app.get(ConfigService<Config>);
  const appConfig = configService.get<AppConfig>('app');
  await app.listen(appConfig.port, () => {
    const url = `http://${appConfig.host}:${appConfig.port}`;
    // Logger.log(`Server running ${url}`);
    // Logger.log(`Swagger running ${url}/docs`);
    Logger.log(`Server running http://localhost:${appConfig.port}/`);
    Logger.log(`Swagger running http://localhost:${appConfig.port}/docs`);
  });
}
bootstrap();
