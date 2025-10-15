"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const mongodb_1 = require("mongodb");
const mongodb_2 = require("better-auth/adapters/mongodb");
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/erp';
const client = new mongodb_1.MongoClient(MONGO_URI);
// NOTE: Better Auth expects the db instance; transactions enabled if client provided
const db = client.db();
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, mongodb_2.mongodbAdapter)(db, { client }),
    trustedOrigins: [
        'http://localhost:4000',
        'http://localhost:3000',
        'http://localhost:3002',
        'https://erp-new.vercel.app',
        'https://erpbackend-two.vercel.app',
    ],
    emailAndPassword: {
        enabled: true,
    },
    // Minimal config: enable email+password
    // Further providers/plugins can be added here later
});
//# sourceMappingURL=better-auth.js.map