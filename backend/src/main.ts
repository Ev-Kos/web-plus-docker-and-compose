import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://kpd-frontend.nomoredomains.work',
      'https://kpd-frontend.nomoredomains.work',
    ],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(4000);
}
bootstrap();
