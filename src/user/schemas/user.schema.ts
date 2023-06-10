import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Music } from 'src/music/schemas/music.schema';
import { Playlist } from 'src/music/schemas/playlist.schema';
import { UserMood } from './user-moods.schema';
import { Mood } from 'src/mood/schemas/mood.schema';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop({ required: true, unique: true })
  @ApiProperty()
  email: string;

  @Prop({ required: true, unique: true })
  @ApiProperty()
  username: string;

  @Prop({ enum: ['male', 'female', 'other'] })
  @ApiProperty()
  gender: string;

  @Prop()
  @ApiProperty()
  birthday: Date;

  @Prop()
  @ApiProperty()
  profilePicture: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Mood.name }] })
  @ApiProperty()
  moods: UserMood[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Music.name }] })
  @ApiProperty()
  likedSongs: Music[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Music.name }] })
  @ApiProperty()
  dislikedSongs: Music[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Playlist.name }],
  })
  @ApiProperty()
  playlists: Playlist[];

  @Prop()
  @ApiProperty()
  verificationCode: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
