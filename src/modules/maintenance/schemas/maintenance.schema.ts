import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MaintenanceDocument = HydratedDocument<Maintenance>;

@Schema({ timestamps: true })
export class Maintenance {
  @Prop({ required: true }) title!: string;
  @Prop({ type: Date, required: true }) date!: Date; // scheduled date
  @Prop({ default: 'Scheduled' }) status?: 'Scheduled' | 'Completed' | 'Pending' | 'Overdue' | string;
  @Prop({ default: '' }) description?: string;
  @Prop({ default: '' }) itemName?: string;
  @Prop({ default: '' }) itemNumber?: string;
  @Prop({ default: '' }) maintenanceType?: string;
  @Prop({ default: '' }) recurringOption?: string;
  @Prop({ default: '' }) attachmentName?: string;
  @Prop({ default: '' }) attachmentUrl?: string;
}

export const MaintenanceSchema = SchemaFactory.createForClass(Maintenance);
