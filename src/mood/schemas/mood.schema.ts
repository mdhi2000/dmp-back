import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type MoodDocument = HydratedDocument<Mood>;

@Schema({ timestamps: true })
export class Mood {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  faName: string;

  @ApiProperty()
  @Prop()
  cover: string;

  @ApiProperty()
  @Prop({ default: false })
  useOpposite: boolean;

  @ApiProperty()
  @Prop()
  oppositeName: string;
}

const MoodSchema = SchemaFactory.createForClass(Mood);

// MoodSchema.virtual('opposite').get(function () {
//   return;
// });

export { MoodSchema };
