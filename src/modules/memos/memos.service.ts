import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Memo, MemoDocument } from './schemas/memo.schema';

@Injectable()
export class MemosService {
  constructor(@InjectModel(Memo.name) private model: Model<MemoDocument>) {}

  async create(input: Partial<Memo>) {
    if (!input.title || !String(input.title).trim()) {
      throw new BadRequestException('Title is required');
    }
    const doc = new this.model({
      title: String(input.title).trim(),
      sentFrom: input.sentFrom || '',
      sentTo: input.sentTo || '',
      date: input.date ? new Date(input.date as any) : new Date(),
      hasAttachment: !!input.hasAttachment,
      type: input.type || 'Sent',
      action: input.action || '',
      attachmentType: input.attachmentType || '',
      body: input.body || '',
      cc: Array.isArray(input.cc) ? input.cc.filter((x) => !!x && String(x).trim()) : [],
      attachmentName: input.attachmentName || '',
      attachmentUrl: input.attachmentUrl || '',
    });
    await doc.save();
    return { id: String(doc._id) };
  }

  async list({ q, type, page = 1, limit = 16 }: { q?: string; type?: string; page?: number; limit?: number }) {
    const filter: any = {};
    if (q && q.trim()) {
      const rx = new RegExp(q.trim(), 'i');
      filter.$or = [
        { title: rx },
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
        hasAttachment: !!x.hasAttachment,
        type: x.type || 'Sent',
        action: x.action || '',
        attachmentType: x.attachmentType || '',
        cc: Array.isArray(x.cc) ? x.cc : [],
        attachmentName: x.attachmentName || '',
        attachmentUrl: x.attachmentUrl || '',
      })),
      total,
      page,
      limit,
    };
  }

  async kpis() {
    const [total] = await Promise.all([
      this.model.countDocuments({}).exec(),
    ]);
    return { total };
  }

  async get(id: string) {
    const x = await this.model.findById(id).lean();
    if (!x) throw new NotFoundException('Memo not found');
    return { id: String(x._id), ...x } as any;
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id).exec();
    return { ok: true } as const;
  }
}
