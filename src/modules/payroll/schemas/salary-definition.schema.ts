import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class SalaryDefinition {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  level!: string;

  @Prop({ required: true, type: Number })
  basicSalary!: number; // USD

  @Prop({ required: true, type: Number })
  allowance!: number; // USD

  @Prop({ required: true, type: Number })
  grossSalary!: number; // USD

  @Prop({ required: true, type: Number })
  deductions!: number; // USD

  @Prop({ required: true, type: Number })
  netSalary!: number; // USD
}

export type SalaryDefinitionDocument = HydratedDocument<SalaryDefinition>;
export const SalaryDefinitionSchema = SchemaFactory.createForClass(SalaryDefinition);
