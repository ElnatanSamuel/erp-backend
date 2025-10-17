import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class StaffApplication {
  @Prop({ required: true }) fullName!: string;
  @Prop({ required: true }) email!: string;
  @Prop({ required: true }) phone!: string;
  @Prop({ default: '' }) address?: string;
  @Prop({ default: '' }) position?: string; // Position applied for
  @Prop({ default: '' }) qualification?: string; // Educational qualification
  @Prop({ default: '' }) experience?: string; // Years of experience
  @Prop({ default: '' }) coverLetter?: string;
  @Prop({ default: '' }) resumeUrl?: string; // URL to uploaded resume
  @Prop({ default: 'Pending' }) status?: string; // Pending | Reviewed | Accepted | Rejected
  @Prop({ type: Date, default: () => new Date() }) appliedDate!: Date;
}

export type StaffApplicationDocument = HydratedDocument<StaffApplication>;
export const StaffApplicationSchema = SchemaFactory.createForClass(StaffApplication);
