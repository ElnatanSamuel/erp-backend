import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logistic, LogisticDocument } from './schemas/logistic.schema';

@Injectable()
export class LogisticsService {
  constructor(@InjectModel(Logistic.name) private model: Model<LogisticDocument>) {}

  async create(input: Partial<Logistic>) {
    if (!input.title || !String(input.title).trim()) throw new BadRequestException('Title is required');
    const amt = Number(input.amount || 0);
    if (!Number.isFinite(amt) || amt < 0) throw new BadRequestException('Amount must be a non-negative number');
    const doc = new this.model({
      title: String(input.title).trim(),
      purpose: input.purpose || '',
      amount: amt,
      requestedBy: input.requestedBy || '',
      sentTo: input.sentTo || '',
      date: input.date ? new Date(input.date) : new Date(),
      status: input.status || 'Pending',
      dateFrom: input.dateFrom ? new Date(input.dateFrom as any) : undefined,
      dateTo: input.dateTo ? new Date(input.dateTo as any) : undefined,
      voucherName: input.voucherName || '',
      accountName: input.accountName || '',
      accountNumber: input.accountNumber || '',
      bankName: input.bankName || '',
      verifierSignature: input.verifierSignature || '',
      authorizerSignature: input.authorizerSignature || '',
    });
    await doc.save();
    return { id: String(doc._id) };
  }

  async list({ q, status, page = 1, limit = 13 }: { q?: string; status?: string; page?: number; limit?: number }) {
    const filter: any = {};
    if (q && q.trim()) {
      const rx = new RegExp(q.trim(), 'i');
      filter.$or = [
        { title: rx },
        { purpose: rx },
        { requestedBy: rx },
        { sentTo: rx },
      ];
    }
    if (status && status !== 'All') filter.status = status;
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      this.model.countDocuments(filter).exec(),
    ]);
    return {
      items: items.map((x) => ({
        id: String(x._id),
        title: x.title,
        purpose: x.purpose,
        amount: x.amount,
        requestedBy: x.requestedBy,
        sentTo: x.sentTo,
        date: x.date,
        status: x.status,
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

  async kpis() {
    const [total, pending, approved, agg] = await Promise.all([
      this.model.countDocuments({}).exec(),
      this.model.countDocuments({ status: 'Pending' }).exec(),
      this.model.countDocuments({ status: 'Approved' }).exec(),
      this.model.aggregate([
        { $group: { _id: null, sum: { $sum: { $ifNull: ['$amount', 0] } } } },
      ]).exec(),
    ]);
    const totalAmount = agg && agg[0] ? agg[0].sum : 0;
    return { total, totalAmount, pending, approved };
  }
}
