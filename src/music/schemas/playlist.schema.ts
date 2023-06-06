import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Music } from 'src/music/schemas/music.schema';

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema({ timestamps: true })
export class Playlist {
  @Prop({ required: true })
  name: string;

  @Prop()
  cover: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Music.name }] })
  songs: Music[];
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
