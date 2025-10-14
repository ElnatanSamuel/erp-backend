import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Circular, CircularDocument } from './schemas/circular.schema';

@Injectable()
export class CircularsService {
  constructor(@InjectModel(Circular.name) private model: Model<CircularDocument>) {}

  async create(input: Partial<Circular>) {
    if (!input.title || !String(input.title).trim()) throw new BadRequestException('Title is required');
    const doc = new this.model({
      title: String(input.title).trim(),
      body: input.body || '',
      sentFrom: input.sentFrom || '',
      sentTo: input.sentTo || '',
      date: input.date ? new Date(input.date) : new Date(),
      type: input.type || 'Sent',
    });
    await doc.save();
    return { id: String(doc._id) };
  }

  async list({ q, type, page = 1, limit = 13 }: { q?: string; type?: string; page?: number; limit?: number }) {
    const filter: any = {};
    if (q && q.trim()) {
      const rx = new RegExp(q.trim(), 'i');
      filter.$or = [
        { title: rx },
        { body: rx },
        { sentFrom: rx },
        { sentTo: rx },
      ];
    }
    if (type && type !== 'All') filter.type = type;
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      this.model.countDocuments(filter).exec(),
    ]);
    return {
      items: items.map((x) => ({
        id: String(x._id),
        title: x.title,
        sentFrom: x.sentFrom,
        sentTo: x.sentTo,
        date: x.date,
        type: x.type,
      })),
      total,
      page,
      limit,
    };
  }

  async get(id: string) {
    const x = await this.model.findById(id).lean();
    if (!x) return null;
    return { id: String(x._id), ...x } as any;
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id).exec();
    return { ok: true } as const;
  }
}
