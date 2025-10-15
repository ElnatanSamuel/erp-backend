"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const node_1 = require("better-auth/node");
const better_auth_1 = require("./better-auth");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.setGlobalPrefix('api');
    // App-level CORS as baseline (Nest will echo request origin when origin=true)
    app.enableCors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
        exposedHeaders: ['Content-Type', 'Authorization'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    // Mount Better Auth handler (cover Express v4/v5 and root path)
    const httpAdapter = app.getHttpAdapter();
    const instance = httpAdapter.getInstance?.();
    // Explicit CORS middleware (runs before all routes, including auth handler)
    const allowedOrigins = new Set([
        'http://localhost:3000',
        'http://localhost:3002',
        'https://erp-new.vercel.app',
    ]);
    if (instance?.use) {
        instance.use((req, res, next) => {
            const origin = req.headers.origin;
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
        instance.all('/api/auth', (0, node_1.toNodeHandler)(better_auth_1.auth));
        instance.all('/api/auth/*', (0, node_1.toNodeHandler)(better_auth_1.auth));
        // Express v5 style catch-all (if applicable)
        instance.all('/api/auth/{*any}', (0, node_1.toNodeHandler)(better_auth_1.auth));
    }
    const port = process.env.PORT || 4000;
    await app.listen(port);
    // eslint-disable-next-line no-console
    console.log(`Backend listening on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map