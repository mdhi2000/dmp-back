import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArtistDocument = HydratedDocument<Artist>;

@Schema({ timestamps: true })
export class Artist {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  plays: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
