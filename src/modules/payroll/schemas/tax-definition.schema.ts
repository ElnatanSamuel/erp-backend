import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class TaxDefinition {
  @Prop({ required: true })
  taxType!: string; // e.g., VAT, WHT, NHIS

  @Prop({ required: true, type: Number, min: 0 })
  percent!: number; // e.g., 2 for 2%
}

export type TaxDefinitionDocument = HydratedDocument<TaxDefinition>;
export const TaxDefinitionSchema = SchemaFactory.createForClass(TaxDefinition);
