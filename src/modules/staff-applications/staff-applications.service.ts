import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StaffApplication, StaffApplicationDocument } from './schemas/staff-application.schema';

@Injectable()
export class StaffApplicationsService {
  constructor(@InjectModel(StaffApplication.name) private model: Model<StaffApplicationDocument>) {}

  async create(input: Partial<StaffApplication>) {
    if (!input.fullName || !String(input.fullName).trim()) {
      throw new BadRequestException('Full name is required');
    }
    if (!input.email || !String(input.email).trim()) {
      throw new BadRequestException('Email is required');
    }
    if (!input.phone || !String(input.phone).trim()) {
      throw new BadRequestException('Phone is required');
    }

    const doc = new this.model({
      fullName: String(input.fullName).trim(),
      email: String(input.email).trim(),
      phone: String(input.phone).trim(),
      address: input.address || '',
      position: input.position || '',
      qualification: input.qualification || '',
      experience: input.experience || '',
      coverLetter: input.coverLetter || '',
      resumeUrl: input.resumeUrl || '',
      status: 'Pending',
      appliedDate: new Date(),
    });

    await doc.save();
    return { id: String(doc._id) };
  }

  async list({ q, status, page = 1, limit = 10 }: { q?: string; status?: string; page?: number; limit?: number }) {
    const filter: any = {};
    if (q && q.trim()) {
      const rx = new RegExp(q.trim(), 'i');
      filter.$or = [
        { fullName: rx },
        { email: rx },
        { position: rx },
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
        fullName: x.fullName,
        email: x.email,
        phone: x.phone,
        position: x.position,
        status: x.status,
        appliedDate: x.appliedDate,
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

  async update(id: string, input: Partial<StaffApplication>) {
    const update: any = {};
    if (input.status) update.status = input.status;
    
    const doc = await this.model.findByIdAndUpdate(id, update, { new: true }).lean();
    if (!doc) throw new BadRequestException('Application not found');
    return { id: String(doc._id), ...doc };
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id).exec();
    return { ok: true } as const;
  }

  async countAll() {
    return this.model.countDocuments().exec();
  }

  async getStats() {
    const [pending, reviewed, accepted, rejected] = await Promise.all([
      this.model.countDocuments({ status: 'Pending' }).exec(),
      this.model.countDocuments({ status: 'Reviewed' }).exec(),
      this.model.countDocuments({ status: 'Accepted' }).exec(),
      this.model.countDocuments({ status: 'Rejected' }).exec(),
    ]);
    return { pending, reviewed, approved: accepted, rejected };
  }
}
