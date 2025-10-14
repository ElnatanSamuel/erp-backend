import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private model: Model<NotificationDocument>) {}

  async create(input: Partial<Notification>) {
    const doc = new this.model({
      message: input.message || '',
      actorName: input.actorName || '',
      actorPhotoUrl: input.actorPhotoUrl || '',
      read: !!input.read,
      userId: input.userId || '',
    });
    await doc.save();
    return { id: String(doc._id) } as const;
  }

  async list({ page = 1, limit = 20, userId }: { page?: number; limit?: number; userId?: string }) {
    const filter: any = {};
    if (userId) filter.userId = userId;
    const skip = (page - 1) * limit;
    const [items, total, unreadCount] = await Promise.all([
      this.model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      this.model.countDocuments(filter),
      this.model.countDocuments({ ...filter, read: false }),
    ]);
    return {
      items: items.map((x) => ({
        id: String(x._id),
        message: x.message,
        actorName: x.actorName,
        actorPhotoUrl: x.actorPhotoUrl,
        read: !!x.read,
        createdAt: (x as any).createdAt,
      })),
      total,
      unreadCount,
      page,
      limit,
    };
  }

  async markAllRead(userId?: string) {
    const filter: any = userId ? { userId, read: false } : { read: false };
    await this.model.updateMany(filter, { $set: { read: true } });
    return { ok: true } as const;
  }

  async markRead(id: string) {
    await this.model.findByIdAndUpdate(id, { $set: { read: true } });
    return { ok: true } as const;
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return { ok: true } as const;
  }
}
