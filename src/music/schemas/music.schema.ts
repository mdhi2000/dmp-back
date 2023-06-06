import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Artist } from 'src/artist/schemas/artist.schema';

export type UserDocument = HydratedDocument<Music>;

@Schema({ timestamps: true })
export class Music {
  @Prop()
  externalId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Artist.name })
  artist: Artist;

  @Prop()
  artist_tags: string[];

  @Prop({ default: 0 })
  plays: number;

  @Prop({ default: 0 })
  downloads: number;

  @Prop()
  permlink: string;

  @Prop()
  photo: string;

  @Prop()
  photo_player: string;

  @Prop()
  share_link: string;

  @Prop()
  title: string;

  @Prop()
  credits?: string;

  @Prop()
  like: number;

  @Prop()
  dislike: number;

  @Prop()
  link: string;

  @Prop()
  hq_link: string;

  @Prop()
  lq_link: string;

  @Prop()
  hls_link: string;

  @Prop()
  hq_hls: string;

  @Prop()
  lq_hls: string;

  @Prop()
  album: string;

  @Prop()
  date: string;

  @Prop()
  duration: number;

  @Prop()
  thumbnail: string;

  @Prop()
  lyric: string;

  @Prop({ index: true })
  kmeans_label: string;
}

export const MusicSchema = SchemaFactory.createForClass(Music);
