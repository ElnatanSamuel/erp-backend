import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Logistic {
  @Prop({ required: true }) title!: string;
  @Prop({ default: '' }) purpose?: string; // e.g., Training course, Vacation
  @Prop({ type: Number, default: 0 }) amount?: number;
  @Prop({ default: '' }) requestedBy?: string; // requester name
  @Prop({ default: '' }) sentTo?: string;      // recipient/approver
  @Prop({ type: Date, default: () => new Date() }) date!: Date;
  @Prop({ default: 'Pending' }) status?: string; // Pending | Approved | Rejected
  // Extra fields for request details
  @Prop({ type: Date }) dateFrom?: Date;
  @Prop({ type: Date }) dateTo?: Date;
  @Prop({ default: '' }) voucherName?: string; // uploaded filename or reference
  @Prop({ default: '' }) accountName?: string;
  @Prop({ default: '' }) accountNumber?: string;
  @Prop({ default: '' }) bankName?: string;
  @Prop({ default: '' }) verifierSignature?: string;
  @Prop({ default: '' }) authorizerSignature?: string;
}

export type LogisticDocument = HydratedDocument<Logistic>;
export const LogisticSchema = SchemaFactory.createForClass(Logistic);
