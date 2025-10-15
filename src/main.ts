import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './better-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');
  // App-level CORS as baseline (Nest will echo request origin when origin=true)
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    exposedHeaders: ['Content-Type', 'Authorization'],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Mount Better Auth handler (cover Express v4/v5 and root path)
  const httpAdapter = app.getHttpAdapter();
  const instance = httpAdapter.getInstance?.() as any;
  
  // Explicit CORS middleware (runs before all routes, including auth handler)
  const allowedOrigins = new Set<string>([
    'http://localhost:3000',
    'http://localhost:3002',
    'https://erp-new.vercel.app',
  ]);
  if (instance?.use) {
    instance.use((req: any, res: any, next: any) => {
      const origin = req.headers.origin as string | undefined;
      if (origin && (allowedOrigins.has(origin))) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        // Ensure caches vary by Origin for proxies/CDNs
        res.setHeader('Vary', 'Origin');
      }
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
      if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
      }
      next();
    });
  }
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

