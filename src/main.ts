import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './better-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  // Enable CORS first so preflight (OPTIONS) gets proper headers
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3002',
      'https://erp-new.vercel.app',
    ],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Mount Better Auth handler (cover Express v4/v5 and root path)
  const httpAdapter = app.getHttpAdapter();
  const instance = httpAdapter.getInstance?.() as any;
  if (instance?.all) {
    instance.all('/api/auth', toNodeHandler(auth));
    instance.all('/api/auth/*', toNodeHandler(auth));
    // Express v5 style catch-all (if applicable)
    instance.all('/api/auth/{*any}', toNodeHandler(auth));
  }

  const port = process.env.PORT || 4000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${port}`);
}
bootstrap();
