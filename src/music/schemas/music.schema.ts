import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Artist } from 'src/artist/schemas/artist.schema';
import { Mood } from 'src/mood/schemas/mood.schema';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import finglishToPersian from 'src/utils/finglishToFa.helpers';

export type MusicDocument = HydratedDocument<Music>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class Music {
  @Prop()
  @ApiProperty()
  externalId: string;

  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Artist.name })
  @ApiProperty({
    type: Artist,
  })
  artist: Artist;

  @Prop()
  @ApiProperty()
  artist_tags: string[];

  @Prop({ default: 0 })
  @ApiProperty()
  plays: number;

  @Prop({ default: 0 })
  @ApiProperty()
  downloads: number;

  @Prop()
  @ApiProperty()
  permlink: string;

  @Prop()
  @ApiProperty()
  photo: string;

  @Prop()
  @ApiProperty()
  photo_player: string;

  @Prop()
  @ApiProperty()
  share_link: string;

  @Prop()
  @ApiProperty()
  title: string;

  @Prop()
  @ApiProperty()
  credits?: string;

  @Prop()
  @ApiProperty()
  like: number;

  @Prop()
  @ApiProperty()
  dislike: number;

  @Prop()
  @ApiProperty()
  link: string;

  @Prop()
  @ApiProperty()
  hq_link: string;

  @Prop()
  @ApiProperty()
  lq_link: string;

  @Prop()
  @ApiProperty()
  hls_link: string;

  @Prop()
  @ApiProperty()
  hq_hls: string;

  @Prop()
  @ApiProperty()
  lq_hls: string;

  @Prop()
  @ApiProperty()
  album: string;

  @Prop()
  @ApiProperty()
  date: string;

  @Prop()
  @ApiProperty()
  duration: number;

  @Prop()
  @ApiProperty()
  thumbnail: string;

  @Prop()
  @ApiProperty()
  lyric: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Mood.name }] })
  @ApiProperty()
  moods: Mood[];

  @Prop({ index: true })
  @ApiProperty()
  kmeans_label: string;

  @Prop()
  @ApiProperty()
  faName: string;

  @Prop()
  @ApiProperty()
  faTitle: string;
}

const MusicSchema = SchemaFactory.createForClass(Music);

MusicSchema.plugin(mongoosePaginate);

// MusicSchema.virtual('faName').get(function () {
//   return finglishToPersian(this.name);
// });

export { MusicSchema };
