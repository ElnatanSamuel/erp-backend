import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BudgetEntry, BudgetEntryDocument } from './schemas/budget.schema';

@Injectable()
export class BudgetService {
  constructor(@InjectModel(BudgetEntry.name) private model: Model<BudgetEntryDocument>) {}

  async create(input: { budgetNo: string; description: string; amountUsd: number; date: string | Date; receivingOffice?: string }) {
    const doc = new this.model({
      budgetNo: input.budgetNo,
      description: input.description,
      amountUsd: Number(input.amountUsd),
      date: new Date(input.date),
      receivingOffice: input.receivingOffice,
      status: 'draft',
    });
    await doc.save();
    return { id: String(doc._id) };
  }

  async list({ page = 1, limit = 50, status }: { page?: number; limit?: number; status?: 'draft' | 'submitted' }) {
    const skip = (page - 1) * limit;
    const filter: any = {};
    if (status) filter.status = status;
    const [items, total] = await Promise.all([
      this.model.find(filter).sort({ date: -1, createdAt: -1 }).skip(skip).limit(limit).lean(),
      this.model.countDocuments(filter).exec(),
    ]);
    return {
      items: items.map((x) => ({
        id: String(x._id),
        budgetNo: x.budgetNo,
        description: x.description,
        amountUsd: x.amountUsd,
        date: x.date,
        receivingOffice: x.receivingOffice ?? null,
        status: x.status,
      })),
      total,
      page,
      limit,
    };
  }

  async submit(id: string) {
    await this.model.findByIdAndUpdate(id, { $set: { status: 'submitted' } }).exec();
    return { ok: true } as const;
  }
}
