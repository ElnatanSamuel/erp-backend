import { UsersService } from './users.service';
import type { Response } from 'express';
export declare class UsersController {
    private users;
    constructor(users: UsersService);
    list(q?: string, role?: string, pageRaw?: string, limitRaw?: string): Promise<{
        items: {
            id: any;
            name: any;
            email: any;
            staffId: any;
            firstName: any;
            lastName: any;
            gender: any;
            phone: any;
            role: any;
            designation: any;
            photoUrl: any;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    create(file: any, body: {
        firstName: string;
        lastName: string;
        gender?: string;
        phone?: string;
        role?: string;
        designation?: string;
    }): Promise<{
        id: any;
        staffId: string;
        email: string;
        name: string;
        photoUrl: string | undefined;
    }>;
    servePhoto(filename: string, res: Response): Promise<void>;
    getOne(id: string): Promise<{
        error: string;
        id?: undefined;
        name?: undefined;
        email?: undefined;
        staffId?: undefined;
        firstName?: undefined;
        lastName?: undefined;
        gender?: undefined;
        phone?: undefined;
        role?: undefined;
        designation?: undefined;
        photoUrl?: undefined;
    } | {
        id: any;
        name: any;
        email: any;
        staffId: any;
        firstName: any;
        lastName: any;
        gender: any;
        phone: any;
        role: any;
        designation: any;
        photoUrl: any;
        error?: undefined;
    }>;
    update(id: string, file: any, body: {
        firstName?: string;
        lastName?: string;
        gender?: string;
        phone?: string;
        role?: string;
        designation?: string;
    }): Promise<{
        id: any;
        name: any;
        email: any;
        staffId: any;
        firstName: any;
        lastName: any;
        gender: any;
        phone: any;
        role: any;
        designation: any;
        photoUrl: any;
    }>;
}
//# sourceMappingURL=users.controller.d.ts.map