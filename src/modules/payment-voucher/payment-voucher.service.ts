import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentVoucher, PaymentVoucherDocument } from './schemas/payment-voucher.schema';

@Injectable()
export class PaymentVoucherService {
  constructor(@InjectModel(PaymentVoucher.name) private model: Model<PaymentVoucherDocument>) {}

  async create(input: Partial<PaymentVoucher>) {
    if (!input.subject || !String(input.subject).trim()) {
      throw new BadRequestException('Subject is required');
    }
    
    const doc = new this.model({
      subject: String(input.subject).trim(),
      date: input.date ? new Date(input.date) : new Date(),
      preparedBy: input.preparedBy || '',
      sendTo: input.sendTo || '',
      items: input.items || [],
      totalUnitPrice: Number(input.totalUnitPrice || 0),
      totalAmount: Number(input.totalAmount || 0),
      totalVatAmount: Number(input.totalVatAmount || 0),
      totalWhtAmount: Number(input.totalWhtAmount || 0),
      totalNetAmount: Number(input.totalNetAmount || 0),
      netAmountInWords: input.netAmountInWords || '',
      accountName: input.accountName || '',
      accountNumber: input.accountNumber || '',
      bankName: input.bankName || '',
      status: input.status || 'Pending',
    });
    await doc.save();
    return { id: String(doc._id) };
  }

  async list({ q, page = 1, limit = 16 }: { q?: string; page?: number; limit?: number }) {
    const filter: any = {};
    if (q && q.trim()) {
      const rx = new RegExp(q.trim(), 'i');
      filter.$or = [
        { subject: rx },
        { preparedBy: rx },
        { sendTo: rx },
      ];
    }
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      this.model.countDocuments(filter).exec(),
    ]);
    return {
      items: items.map((x) => ({
        id: String(x._id),
        subject: x.subject,
        date: x.date,
        preparedBy: x.preparedBy,
        sendTo: x.sendTo,
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

  async update(id: string, input: Partial<PaymentVoucher>) {
    const doc = await this.model.findById(id);
    if (!doc) throw new BadRequestException('Payment voucher not found');
    
    if (input.subject !== undefined) doc.subject = String(input.subject).trim();
    if (input.date !== undefined) doc.date = new Date(input.date);
    if (input.preparedBy !== undefined) doc.preparedBy = input.preparedBy;
    if (input.sendTo !== undefined) doc.sendTo = input.sendTo;
    if (input.items !== undefined) doc.items = input.items;
    if (input.totalUnitPrice !== undefined) doc.totalUnitPrice = Number(input.totalUnitPrice);
    if (input.totalAmount !== undefined) doc.totalAmount = Number(input.totalAmount);
    if (input.totalVatAmount !== undefined) doc.totalVatAmount = Number(input.totalVatAmount);
    if (input.totalWhtAmount !== undefined) doc.totalWhtAmount = Number(input.totalWhtAmount);
    if (input.totalNetAmount !== undefined) doc.totalNetAmount = Number(input.totalNetAmount);
    if (input.netAmountInWords !== undefined) doc.netAmountInWords = input.netAmountInWords;
    if (input.accountName !== undefined) doc.accountName = input.accountName;
    if (input.accountNumber !== undefined) doc.accountNumber = input.accountNumber;
    if (input.bankName !== undefined) doc.bankName = input.bankName;
    if (input.status !== undefined) doc.status = input.status;

    await doc.save();
    return { id: String(doc._id) };
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id).exec();
    return { ok: true } as const;
  }

  async count() {
    return this.model.countDocuments({}).exec();
  }
}
