import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MoodDocument = HydratedDocument<Mood>;

@Schema({ timestamps: true })
export class Mood {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  cover: string;

  @Prop({ default: false })
  useOpposite: boolean;

  @Prop()
  oppositeName: string;
}

const MoodSchema = SchemaFactory.createForClass(Mood);

// MoodSchema.virtual('opposite').get(function () {
//   return;
// });

export { MoodSchema };
