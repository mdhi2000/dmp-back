import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Model } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

export type MoodDocument = HydratedDocument<Mood>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  toObject: {
    virtuals: true,
    getters: true,
  },
})
export class Mood extends Document {
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

  opposite;
}

const MoodSchema = SchemaFactory.createForClass(Mood);

MoodSchema.virtual('opposite', {
  localField: 'oppositeName',
  foreignField: 'name',
  ref: Mood.name,
  justOne: true,
});

export { MoodSchema };
