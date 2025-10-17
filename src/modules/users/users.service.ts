import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async getOneById(id: string) {
    return this.userModel.findById(id).lean();
  }

  async createUser(data: Partial<User> & { email: string; name: string; passwordHash: string }) {
    const user = new this.userModel(data);
    return user.save();
  }

  async countAll() {
    return this.userModel.countDocuments({ isStaff: true }).exec();
  }

  async countDesignations() {
    const result = await this.userModel.distinct('designation', { 
      isStaff: true, 
      designation: { $exists: true, $ne: '' } 
    }).exec();
    return result.length;
  }

  async findMany({
    q,
    role,
    page = 1,
    limit = 10,
  }: {
    q?: string;
    role?: string;
    page?: number;
    limit?: number;
  }) {
    const filter: any = { isStaff: true }; // Only show actual staff members
    if (q && q.trim()) {
      const rx = new RegExp(q.trim(), 'i');
      filter.$or = [{ name: rx }, { email: rx }];
    }
    if (role && role !== 'All') {
      filter.role = role;
    }
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.userModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      this.userModel.countDocuments(filter).exec(),
    ]);
    return { items, total };
  }

  async createStaff(input: {
    firstName: string;
    lastName: string;
    gender?: string;
    phone?: string;
    role?: string;
    designation?: string;
    photoUrl?: string;
  }) {
    const name = `${input.firstName} ${input.lastName}`.trim();
    // Generate unique staffId
    const roleCode =
      (input.role || 'STF')
        .slice(0, 3)
        .toUpperCase()
        .replace(/[^A-Z]/g, '') || 'STF';
    let staffId: string;
    for (;;) {
      const rand = Math.floor(1000 + Math.random() * 9000);
      staffId = `${rand}${roleCode}`;
      const exists = await this.userModel.findOne({ staffId }).lean();
      if (!exists) break;
    }

    // Generate official email
    const domain = process.env.OFFICIAL_EMAIL_DOMAIN || 'company.local';
    const base = `${input.firstName}.${input.lastName}`
      .toLowerCase()
      .replace(/\s+/g, '.')
      .replace(/[^a-z0-9.]/g, '');
    let email = `${base}@${domain}`;
    let suffix = 1;
    while (await this.userModel.findOne({ email }).lean()) {
      email = `${base}${suffix}@${domain}`;
      suffix += 1;
    }

    // Generate random password
    const rawPass = Math.random().toString(36).slice(-10);
    const passwordHash = await bcrypt.hash(rawPass, 10);

    const doc = await this.createUser({
      email,
      name,
      passwordHash,
      staffId,
      firstName: input.firstName,
      lastName: input.lastName,
      gender: input.gender,
      phone: input.phone,
      role: input.role,
      designation: input.designation,
      photoUrl: input.photoUrl,
      isStaff: true, // Mark as actual staff member
    } as any);
    return { user: doc, generatedEmail: email, generatedStaffId: staffId };
  }

  async updateStaff(
    id: string,
    input: {
      firstName?: string;
      lastName?: string;
      gender?: string;
      phone?: string;
      role?: string;
      designation?: string;
      photoUrl?: string;
    }
  ) {
    const update: any = {};
    for (const [k, v] of Object.entries(input)) {
      if (typeof v !== 'undefined' && v !== null && v !== '') update[k] = v;
    }
    if (input.firstName || input.lastName) {
      const first = input.firstName ?? undefined;
      const last = input.lastName ?? undefined;
      update.name = `${first ?? ''} ${last ?? ''}`.trim();
    }
    const doc = await this.userModel.findByIdAndUpdate(id, update, { new: true }).exec();
    return doc;
  }
}
