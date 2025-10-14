import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Training, TrainingDocument } from './schemas/training.schema';

@Injectable()
export class TrainingsService {
  constructor(@InjectModel(Training.name) private model: Model<TrainingDocument>) {}

  async create(input: Partial<Training>) {
    if (!input.description || !String(input.description).trim()) throw new BadRequestException('Description is required');
    if (!input.date) throw new BadRequestException('Date is required');
    const date = new Date(input.date as any); if (isNaN(date.getTime())) throw new BadRequestException('Invalid date');
    const doc = new this.model({
      description: String(input.description).trim(),
      trainingType: input.trainingType || '',
      duration: input.duration || '',
      mode: input.mode || '',
      staff: Array.isArray(input.staff) ? input.staff : [],
      date,
      status: input.status || 'To-do',
    });
    await doc.save();
    return { id: String(doc._id) } as const;
  }

  async list({ q, page = 1, limit = 20 }: { q?: string; page?: number; limit?: number }) {
    const filter: any = {};
    if (q && q.trim()) {
      const rx = new RegExp(q.trim(), 'i');
      filter.$or = [ { description: rx }, { trainingType: rx }, { mode: rx }, { duration: rx } ];
    }
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      this.model.countDocuments(filter),
    ]);
    return {
      items: items.map((x) => ({
        id: String(x._id),
        description: x.description,
        trainingType: x.trainingType,
        duration: x.duration,
        mode: x.mode,
        date: x.date,
        staff: x.staff,
        status: x.status,
      })),
      total,
      page,
      limit,
    };
  }

  async kpis() {
    const [totalReq, totalDone, docs] = await Promise.all([
      this.model.countDocuments({}),
      this.model.countDocuments({ status: 'Completed' }),
      this.model.find({}).select('staff status').lean(),
    ]);
    const totalStaffTrained = docs.filter((d: any) => d.status === 'Completed').reduce((sum: number, d: any) => sum + (Array.isArray(d.staff) ? d.staff.length : 0), 0);
    const rate = totalReq > 0 ? Math.round((totalDone / totalReq) * 100) : 0;
    return { totalRequests: totalReq, totalStaffTrained, totalTrainingDone: totalDone, trainingRatePct: rate } as const;
  }

  async get(id: string) {
    const x = await this.model.findById(id).lean();
    if (!x) return null;
    return { id: String(x._id), ...x } as any;
  }

  async setStatus(id: string, status: string) {
    await this.model.findByIdAndUpdate(id, { $set: { status } }).exec();
    return { ok: true } as const;
  }
}
