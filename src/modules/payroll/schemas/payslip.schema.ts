import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Payslip {
  @Prop({ required: true }) staffName!: string;
  @Prop({ required: true }) title!: string;
  @Prop({ required: true }) level!: string;

  // Optional payroll metadata
  @Prop() paymentName?: string;
  @Prop() payMonth?: string; // e.g., 'January'
  @Prop() payYear?: string;  // e.g., '2025'

  // Salary structure
  @Prop({ type: Number, default: 0 }) basicSalary!: number;
  @Prop({ type: Number, default: 0 }) housingAllowance!: number;
  @Prop({ type: Number, default: 0 }) transportAllowance!: number;
  @Prop({ type: Number, default: 0 }) utilityAllowance!: number;
  @Prop({ type: Number, default: 0 }) productivityAllowance!: number;
  @Prop({ type: Number, default: 0 }) communicationAllowance!: number;
  @Prop({ type: Number, default: 0 }) inconvenienceAllowance!: number;

  @Prop({ type: Number, default: 0 }) grossSalary!: number;

  // Deductions
  @Prop({ type: Number, default: 0 }) taxPayee!: number;
  @Prop({ type: Number, default: 0 }) employeePension!: number;
  @Prop({ type: Number, default: 0 }) totalDeduction!: number;

  @Prop({ type: Number, default: 0 }) netSalary!: number;
}

export type PayslipDocument = HydratedDocument<Payslip>;
export const PayslipSchema = SchemaFactory.createForClass(Payslip);
