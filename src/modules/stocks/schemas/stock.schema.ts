import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class StockItem {
  @Prop({ required: true }) name!: string;
  @Prop({ default: '' }) productId?: string;
  @Prop({ default: '' }) category?: string;
  @Prop({ type: Number, default: 0 }) qtyPurchased?: number;
  @Prop({ type: Number, default: 0 }) unitPrice?: number;
  @Prop({ type: Number, default: 0 }) totalAmount?: number;
  @Prop({ type: Number, default: 0 }) inStock?: number;
  @Prop({ type: Number, default: 0 }) functioning?: number; // number of functioning units for inventory view
  @Prop({ default: '' }) supplier?: string;
  @Prop({ default: '' }) imageName?: string;
  @Prop({ default: '' }) imageUrl?: string;
  @Prop({ default: 'In stock' }) status?: 'In stock' | 'Low in Stock' | 'Out of Stock' | string;
}

export type StockItemDocument = HydratedDocument<StockItem>;
export const StockItemSchema = SchemaFactory.createForClass(StockItem);
