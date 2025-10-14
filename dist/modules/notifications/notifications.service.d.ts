import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';
export declare class NotificationsService {
    private model;
    constructor(model: Model<NotificationDocument>);
    create(input: Partial<Notification>): Promise<{
        readonly id: string;
    }>;
    list({ page, limit, userId }: {
        page?: number;
        limit?: number;
        userId?: string;
    }): Promise<{
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
    markAllRead(userId?: string): Promise<{
        readonly ok: true;
    }>;
    markRead(id: string): Promise<{
        readonly ok: true;
    }>;
    delete(id: string): Promise<{
        readonly ok: true;
    }>;
}
//# sourceMappingURL=notifications.service.d.ts.map