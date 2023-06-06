import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Music } from 'src/music/schemas/music.schema';

export type ArtistDocument = HydratedDocument<Artist>;

@Schema({ timestamps: true })
export class Artist {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  plays: number;

  @Prop()
  photo: string;

  @Prop()
  photo_player: string;

  @Prop()
  photo_thumb: string;

  @Prop()
  background: string;

  @Prop()
  share_link: string;

  @Prop()
  followers_count: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }],
    default: [],
  })
  musics: Music[];
}

const ArtistSchema = SchemaFactory.createForClass(Artist);

export { ArtistSchema };
