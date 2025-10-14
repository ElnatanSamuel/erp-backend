import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Training {
  @Prop({ required: true }) description!: string;
  @Prop({ default: '' }) trainingType?: string; // Team, Individual
  @Prop({ default: '' }) duration?: string; // e.g., 3days, 2weeks
  @Prop({ default: '' }) mode?: string; // Physical, Online
  @Prop({ type: Date, required: true }) date!: Date;
  @Prop({ type: [String], default: [] }) staff?: string[]; // names
  @Prop({ default: 'To-do' }) status?: 'To-do' | 'Inprogress' | 'Completed' | string;
}

export type TrainingDocument = HydratedDocument<Training>;
export const TrainingSchema = SchemaFactory.createForClass(Training);
