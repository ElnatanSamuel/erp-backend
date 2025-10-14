import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Memo {
  @Prop({ required: true }) title!: string;
  @Prop({ default: '' }) sentFrom?: string;
  @Prop({ default: '' }) sentTo?: string;
  @Prop({ type: Date, default: () => new Date() }) date!: Date;
  @Prop({ default: false }) hasAttachment?: boolean; // true => Yes on table
  @Prop({ default: 'Sent' }) type?: 'Sent' | 'Received' | string;
  @Prop({ default: '' }) action?: string;
  @Prop({ default: '' }) attachmentType?: string;
  @Prop({ default: '' }) body?: string;
  @Prop({ type: [String], default: [] }) cc?: string[];
  @Prop({ default: '' }) attachmentName?: string;
  @Prop({ default: '' }) attachmentUrl?: string;
}

export type MemoDocument = HydratedDocument<Memo>;
export const MemoSchema = SchemaFactory.createForClass(Memo);
