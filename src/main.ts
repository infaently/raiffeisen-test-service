import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { name, description, version } from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // [Swagger setup]
  const params = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, params);
  SwaggerModule.setup('/api', app, document);
  // [/Swagger setup]

  // For real app need to use mods (PRODUCTION, DEV etc)
  // and packages in development mode like https://www.npmjs.com/package/portfinder
  await app.listen(configService.get('HTTP_PORT'));
}

bootstrap();

// Требуется реализовать «банковский» микросервис, состоящий из 2 endpoint:
// Получение баланса по счёту
// HTTP GET /account/{account-id}.
// Endpoint должен возвращать баланс в формате application/json.
// Пример вызова: curl -H “Accept-encoding: application/json” http://localhost:3000/account/1234
// Пример ответа: {“balance”: 123456.01}
// HTTP POST /transfer/{source-account-id}/{target-account-id} .
// Сумма перевода приходит в теле запроса в application/json.
// Пример вызова: curl -H “Content-type: application/json” –data ‘{“amount”: 1234}’ -X POST http://localhost:3000/transfer/1234/5678
