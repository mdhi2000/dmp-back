import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Mood } from 'src/mood/schemas/mood.schema';
import { User } from './user.schema';

export type UserMoodDocument = HydratedDocument<UserMood>;

@Schema({ timestamps: true })
export class UserMood {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Mood.name })
  mood: Mood;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ default: 0 })
  weight: number;
}

export const UserMoodSchema = SchemaFactory.createForClass(UserMood);
