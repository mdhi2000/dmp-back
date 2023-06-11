import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { promises } from 'dns';
import mongoose, { HydratedDocument, Document, Model } from 'mongoose';
import { Music } from 'src/music/schemas/music.schema';

export type AutoPlaylistDocument = HydratedDocument<AutoPlaylist>;

@Schema({ timestamps: true })
export class AutoPlaylist extends Document {
  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  cover: string;

  @Prop({ required: true })
  @ApiProperty()
  keywords: string[];

  get musics(): Promise<Music[]> {
    const MusicModel: Model<Music> = this.$model(Music.name);

    const prompts = this.keywords.map((keyword) => ({
      lyric: { $regex: RegExp(`${keyword}`, 'ig') },
    }));

    return MusicModel.find({
      $and: prompts,
    })
      .populate('artist', 'mood')
      .exec();
  }
}

export const AutoPlaylistSchema = SchemaFactory.createForClass(AutoPlaylist);
