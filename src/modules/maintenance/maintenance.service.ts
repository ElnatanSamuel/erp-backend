import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Maintenance, MaintenanceDocument } from './schemas/maintenance.schema';

@Injectable()
export class MaintenanceService {
  constructor(@InjectModel(Maintenance.name) private model: Model<MaintenanceDocument>) {}

  async create(input: Partial<Maintenance>) {
    if (!input.date) throw new BadRequestException('Date is required');
    const date = new Date(input.date as any);
    if (isNaN(date.getTime())) throw new BadRequestException('Invalid date');
    const autoTitle = (() => {
      const t = `${input.maintenanceType || 'Maintenance'} for ${input.itemName || ''}${input.itemNumber ? ' ' + input.itemNumber : ''}`.trim();
      return t.replace(/\s+/g, ' ');
    })();
    const title = (input.title && String(input.title).trim()) || autoTitle;
    if (!title) throw new BadRequestException('Title is required');
    const doc = new this.model({
      title,
      description: input.description || '',
      status: input.status || 'Scheduled',
      date,
      itemName: input.itemName || '',
      itemNumber: input.itemNumber || '',
      maintenanceType: input.maintenanceType || '',
      recurringOption: input.recurringOption || '',
    });
    await doc.save();
    return { id: String(doc._id) };
  }

  async list({ month, year }: { month?: number; year?: number }) {
    let filter: any = {};
    if (typeof month === 'number' && typeof year === 'number') {
      const start = new Date(year, month, 1, 0, 0, 0, 0);
      const end = new Date(year, month + 1, 1, 0, 0, 0, 0);
      filter.date = { $gte: start, $lt: end };
    }
    const items = await this.model.find(filter).sort({ date: 1 }).lean();
    return {
      items: items.map((x) => ({
        id: String(x._id),
        title: x.title,
        description: x.description,
        status: x.status,
        date: x.date,
        itemName: (x as any).itemName,
        itemNumber: (x as any).itemNumber,
        maintenanceType: (x as any).maintenanceType,
        recurringOption: (x as any).recurringOption,
      })),
    };
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

  async updateAttachment(id: string, name: string, url: string) {
    await this.model.findByIdAndUpdate(id, { $set: { attachmentName: name, attachmentUrl: url } }).exec();
    return { ok: true } as const;
  }

  async kpis() {
    const [scheduled, completed, pending, overdue] = await Promise.all([
      this.model.countDocuments({ status: 'Scheduled' }),
      this.model.countDocuments({ status: 'Completed' }),
      this.model.countDocuments({ status: 'Pending' }),
      this.model.countDocuments({ status: 'Overdue' }),
    ]);
    return { scheduled, completed, pending, overdue };
  }
}
