import { AuthService } from './auth.service';
import type { Response } from 'express';
declare class RegisterDto {
    email: string;
    name: string;
    password: string;
}
declare class LoginDto {
    email: string;
    password: string;
}
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    register(dto: RegisterDto): Promise<{
        token: string;
        user: {
            id: any;
            email: string;
            name: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: any;
            email: string;
            name: string;
        };
    }>;
    me(authHeader?: string): Promise<{
        user: {
            id: any;
            email: string;
            name: string;
        };
    }>;
    logout(res: Response): Promise<{
        readonly ok: true;
    }>;
}
export {};
//# sourceMappingURL=auth.controller.d.ts.map