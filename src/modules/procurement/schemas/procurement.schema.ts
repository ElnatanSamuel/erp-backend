import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Procurement {
  @Prop({ required: true }) itemName!: string;
  @Prop({ type: Number, default: 1 }) quantity!: number;
  @Prop({ type: Number, default: 0 }) unitPrice!: number;
  @Prop({ type: Number, default: 0 }) totalPrice!: number;
  @Prop({ default: '' }) requestedBy?: string;
  @Prop({ default: '' }) sentTo?: string;
  @Prop({ type: Date, default: () => new Date() }) date!: Date;
  @Prop({ default: 'Pending' }) status?: string; // Pending | Approved | Rejected | Draft
  
  // Attachment details
  @Prop({ default: '' }) addAttachment?: string;
  @Prop({ default: '' }) attachmentType?: string;
  @Prop({ default: 'No' }) hasAttachment?: string; // Yes | No
  
  // Payment Voucher details
  @Prop({ type: Number, default: 0 }) vatPercent?: number;
  @Prop({ type: Number, default: 0 }) vatAmount?: number;
  @Prop({ type: Number, default: 0 }) grossAmount?: number;
  
  // Beneficiary Payment Details
  @Prop({ default: '' }) accountName?: string;
  @Prop({ default: '' }) accountNumber?: string;
  @Prop({ default: '' }) bankName?: string;
  
  // Memo Activities
  @Prop({ default: '' }) initiatedBy?: string;
  @Prop({ default: '' }) verifiedBy?: string;
  @Prop({ default: '' }) approvedBy?: string;
  
  // Signatures
  @Prop({ default: '' }) verifierSignature?: string;
  @Prop({ default: '' }) authorizerSignature?: string;
}

export type ProcurementDocument = HydratedDocument<Procurement>;
export const ProcurementSchema = SchemaFactory.createForClass(Procurement);
