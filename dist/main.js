"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Global API prefix
    app.setGlobalPrefix('api');
    // Validation pipe
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    // Allowed origins for CORS
    const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3002',
        'https://erp-new.vercel.app',
    ];
    // Enable NestJS CORS globally
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error(`Not allowed by CORS: ${origin}`));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    });
    // Start server
    const port = process.env.PORT || 4000;
    await app.listen(port);
    console.log(`✅ Backend running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map