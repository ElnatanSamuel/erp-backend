import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true }) message!: string;
  @Prop({ default: '' }) actorName?: string; // who triggered it
  @Prop({ default: '' }) actorPhotoUrl?: string;
  @Prop({ default: false }) read?: boolean;
  @Prop({ default: '' }) userId?: string; // optional scoping
}

export type NotificationDocument = HydratedDocument<Notification>;
export const NotificationSchema = SchemaFactory.createForClass(Notification);
