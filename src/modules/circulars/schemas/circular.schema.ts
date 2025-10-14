import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Circular {
  @Prop({ required: true }) title!: string;
  @Prop({ default: '' }) body?: string;
  @Prop({ default: '' }) sentFrom?: string; // e.g., Admin, HR
  @Prop({ default: '' }) sentTo?: string;   // e.g., Operations Staffs
  @Prop({ type: Date, default: () => new Date() }) date!: Date;
  @Prop({ default: 'Sent' }) type?: string; // 'Sent' | 'Received'
}

export type CircularDocument = HydratedDocument<Circular>;
export const CircularSchema = SchemaFactory.createForClass(Circular);
