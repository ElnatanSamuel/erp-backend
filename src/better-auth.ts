import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/erp';
const client = new MongoClient(MONGO_URI);

// NOTE: Better Auth expects the db instance; transactions enabled if client provided
const db = client.db();

const FRONTEND_URL = process.env.FRONTEND_URL; // e.g., https://erp-new.vercel.app
const BACKEND_URL = process.env.BETTER_AUTH_URL; // e.g., https://erp-backend-xxx.onrender.com

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  trustedOrigins: [
    'http://localhost:4000',
    'http://localhost:3000',
    'http://localhost:3002',
    ...(FRONTEND_URL ? [FRONTEND_URL] : []),
    ...(BACKEND_URL ? [BACKEND_URL] : []),
  ],
  emailAndPassword: {
    enabled: true,
  },
  // Minimal config: enable email+password
  // Further providers/plugins can be added here later
});
