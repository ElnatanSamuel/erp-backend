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

  // Explicit CORS middleware (runs before all routes, including auth handler)
  // Temporarily allow any requesting Origin (echo back) to unblock credentials in production.
  // If you need to restrict, replace this with an allowlist check.
  app.use((req: any, res: any, next: any) => {
    const origin = req.headers.origin as string | undefined;
    const allowOrigin = origin || undefined; // echo exact origin when present

    // Intercept writeHead to guarantee headers are present right before send
    const origWriteHead = res.writeHead;
    res.writeHead = function patchedWriteHead(this: any, ...args: any[]) {
      // Remove any pre-existing conflicting headers, then set ours
      this.removeHeader('Access-Control-Allow-Origin');
      this.removeHeader('Access-Control-Allow-Credentials');
      this.removeHeader('Access-Control-Allow-Methods');
      this.removeHeader('Access-Control-Allow-Headers');
      if (allowOrigin) {
        this.setHeader('Access-Control-Allow-Origin', allowOrigin);
        this.setHeader('Vary', 'Origin');
      }
      this.setHeader('Access-Control-Allow-Credentials', 'true');
      this.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
      this.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
      return origWriteHead.apply(this, args);
    };

    // Handle preflight early
    if (req.method === 'OPTIONS') {
      if (allowOrigin) {
        res.setHeader('Access-Control-Allow-Origin', allowOrigin);
        res.setHeader('Vary', 'Origin');
      }
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
      res.status(204).end();
      return;
    }
    next();
  });

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
