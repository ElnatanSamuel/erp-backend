import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class BudgetEntry {
  @Prop({ required: true })
  budgetNo!: string;

  @Prop({ required: true })
  description!: string;

  // store in USD (number)
  @Prop({ required: true, type: Number })
  amountUsd!: number;

  @Prop({ required: true, type: Date })
  date!: Date;

  @Prop({ required: false })
  receivingOffice?: string;

  @Prop({ required: true, enum: ['draft', 'submitted'], default: 'draft' })
  status!: 'draft' | 'submitted';
}

export type BudgetEntryDocument = HydratedDocument<BudgetEntry>;
export const BudgetEntrySchema = SchemaFactory.createForClass(BudgetEntry);
