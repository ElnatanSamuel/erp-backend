import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  passwordHash!: string;

  @Prop({ unique: true, sparse: true })
  staffId?: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  gender?: string;

  @Prop()
  phone?: string;

  @Prop()
  role?: string;

  @Prop()
  designation?: string;

  @Prop()
  photoUrl?: string;

  @Prop({ default: false })
  isStaff?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
