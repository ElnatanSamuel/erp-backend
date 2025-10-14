import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private users;
    private jwt;
    constructor(users: UsersService, jwt: JwtService);
    register(input: {
        email: string;
        name: string;
        password: string;
    }): Promise<{
        token: string;
        user: {
            id: any;
            email: string;
            name: string;
        };
    }>;
    login(input: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
        user: {
            id: any;
            email: string;
            name: string;
        };
    }>;
    me(bearerToken?: string): Promise<{
        id: any;
        email: string;
        name: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map