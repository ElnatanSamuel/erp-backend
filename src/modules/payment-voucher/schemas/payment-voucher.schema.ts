import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class PaymentVoucherItem {
  @Prop({ required: true }) sn!: string;
  @Prop({ required: true }) class!: string;
  @Prop({ required: true }) description!: string;
  @Prop({ type: Number, required: true }) qty!: number;
  @Prop({ type: Number, required: true }) unitPrice!: number;
  @Prop({ type: Number, required: true }) amount!: number;
  @Prop({ type: Number, required: true }) vatPercent!: number;
  @Prop({ type: Number, required: true }) vatAmount!: number;
  @Prop({ type: Number, required: true }) grossAmount!: number;
  @Prop({ type: Number, default: 0 }) whtPercent?: number;
  @Prop({ type: Number, default: 0 }) whtAmount?: number;
  @Prop({ type: Number, required: true }) netAmount!: number;
}

@Schema({ timestamps: true })
export class PaymentVoucher {
  @Prop({ required: true }) subject!: string;
  @Prop({ type: Date, default: () => new Date() }) date!: Date;
  @Prop({ default: '' }) preparedBy?: string;
  @Prop({ default: '' }) sendTo?: string;
  
  // Line items
  @Prop({ type: [Object], default: [] }) items!: PaymentVoucherItem[];
  
  // Totals
  @Prop({ type: Number, default: 0 }) totalUnitPrice!: number;
  @Prop({ type: Number, default: 0 }) totalAmount!: number;
  @Prop({ type: Number, default: 0 }) totalVatAmount!: number;
  @Prop({ type: Number, default: 0 }) totalWhtAmount!: number;
  @Prop({ type: Number, default: 0 }) totalNetAmount!: number;
  
  // Net amount in words
  @Prop({ default: '' }) netAmountInWords?: string;
  
  // Beneficiary Payment Details
  @Prop({ default: '' }) accountName?: string;
  @Prop({ default: '' }) accountNumber?: string;
  @Prop({ default: '' }) bankName?: string;
  
  @Prop({ default: 'Pending' }) status?: string; // Pending | Approved | Rejected
}

export type PaymentVoucherDocument = HydratedDocument<PaymentVoucher>;
export const PaymentVoucherSchema = SchemaFactory.createForClass(PaymentVoucher);
