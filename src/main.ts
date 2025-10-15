import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './better-auth';

async function bootstrap() {
  // Important: disable Nest's built-in CORS so we fully control headers below
  const app = await NestFactory.create(AppModule, { cors: false });

  app.setGlobalPrefix('api');
  // App-level CORS as baseline (Nest will echo request origin when origin=true)
  // app.enableCors({
  //   origin: true,
  //   credentials: true,
  //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  //   allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  //   exposedHeaders: ['Content-Type', 'Authorization'],
  // });
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
      // Choose an exact origin to allow (never '*')
      let allowOrigin: string | undefined;
      if (origin && allowedOrigins.has(origin)) allowOrigin = origin;
      // Remove any pre-existing CORS headers injected by downstream handlers
      res.removeHeader('Access-Control-Allow-Origin');
      res.removeHeader('Access-Control-Allow-Credentials');
      res.removeHeader('Access-Control-Allow-Methods');
      res.removeHeader('Access-Control-Allow-Headers');

      if (allowOrigin) {
        res.setHeader('Access-Control-Allow-Origin', allowOrigin);
        if (origin) res.setHeader('Vary', 'Origin');
      }
      // Minimal runtime trace (one-liner) to verify origin negotiation in logs
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.log('[CORS]', { origin, allowOrigin });
      }
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Accept, X-Requested-With'
      );
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
