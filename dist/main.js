"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const node_1 = require("better-auth/node");
const better_auth_1 = require("./better-auth");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    // Enable CORS first so preflight (OPTIONS) gets proper headers
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:3002'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    // Mount Better Auth handler (cover Express v4/v5 and root path)
    const httpAdapter = app.getHttpAdapter();
    const instance = httpAdapter.getInstance?.();
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