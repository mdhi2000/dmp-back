import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Mood } from 'src/mood/schemas/mood.schema';

export type UserMoodDocument = HydratedDocument<UserMood>;

@Schema({ timestamps: true })
export class UserMood {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Mood.name })
  mood: Mood;

  @Prop({ default: 0 })
  weight: number;
}

export const UserMoodSchema = SchemaFactory.createForClass(UserMood);
