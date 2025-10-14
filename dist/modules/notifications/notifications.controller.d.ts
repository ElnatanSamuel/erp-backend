import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly svc;
    constructor(svc: NotificationsService);
    list(pageRaw?: string, limitRaw?: string, userId?: string): Promise<{
        items: {
            id: string;
            message: string;
            actorName: string | undefined;
            actorPhotoUrl: string | undefined;
            read: boolean;
            createdAt: any;
        }[];
        total: number;
        unreadCount: number;
        page: number;
        limit: number;
    }>;
    create(body: any): Promise<{
        readonly id: string;
    }>;
    markAllRead(body: {
        userId?: string;
    }): Promise<{
        readonly ok: true;
    }>;
    markRead(id: string): Promise<{
        readonly ok: true;
    }>;
    delete(id: string): Promise<{
        readonly ok: true;
    }>;
}
//# sourceMappingURL=notifications.controller.d.ts.map