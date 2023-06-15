import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Model, Document } from 'mongoose';
import { Music } from 'src/music/schemas/music.schema';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type ArtistDocument = HydratedDocument<Artist>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class Artist extends Document {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  name: string;

  @ApiProperty()
  @Prop({ default: 0 })
  plays: number;

  @ApiProperty()
  @Prop({
    get: (link: string) =>
      link?.replace(
        'https://assets.rjassets.com/',
        'https://leia2.mdhi.dev/rjassets/',
      ),
  })
  photo: string;

  @ApiProperty()
  @Prop({
    get: (link: string) =>
      link?.replace(
        'https://assets.rjassets.com/',
        'https://leia2.mdhi.dev/rjassets/',
      ),
  })
  photo_player: string;

  @ApiProperty()
  @Prop({
    get: (link: string) =>
      link?.replace(
        'https://assets.rjassets.com/',
        'https://leia2.mdhi.dev/rjassets/',
      ),
  })
  photo_thumb: string;

  @ApiProperty()
  @Prop({
    get: (link: string) =>
      link?.replace(
        'https://assets.rjassets.com/',
        'https://leia2.mdhi.dev/rjassets/',
      ),
  })
  background: string;

  @ApiProperty()
  @Prop({
    get: (link: string) =>
      link?.replace('https://rj.app/', 'https://leia2.mdhi.dev/rj/'),
  })
  share_link: string;

  @ApiProperty()
  @Prop({ default: 0 })
  followers_count: number;

  @ApiProperty({
    type: [Music],
  })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }],
    default: [],
  })
  musics: Music[];

  // get musics(): Promise<Music[]> {
  //   const MusicModel: Model<Music> = this.$model('Music'); // Access the Music model

  //   return MusicModel.find({ artist: this._id }).exec();
  // }

  @Prop()
  @ApiProperty()
  faName: string;
}

const ArtistSchema = SchemaFactory.createForClass(Artist);

ArtistSchema.plugin(mongoosePaginate);

// ArtistSchema.virtual('faName').get(function () {
//   return finglishToPersian(this.name);
// });

export { ArtistSchema };
