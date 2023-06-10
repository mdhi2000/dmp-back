import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Music } from 'src/music/schemas/music.schema';

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema({ timestamps: true })
export class Playlist {
  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  cover: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Music.name }] })
  @ApiProperty({
    type: [Music],
  })
  musics: Music[];
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
