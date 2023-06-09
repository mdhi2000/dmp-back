import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Music } from 'src/music/schemas/music.schema';
import { Playlist } from 'src/music/schemas/playlist.schema';
import { UserMood } from './user-moods.schema';
import { Mood } from 'src/mood/schemas/mood.schema';

export type UserDocument = HydratedDocument<User>;

interface IMood {
  name: string;
  cover: string;
  songs: Music[];
}

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ enum: ['male', 'female', 'other'] })
  gender: string;

  @Prop()
  birthday: Date;

  @Prop()
  profilePicture: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Mood.name }] })
  moods: UserMood[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Music.name }] })
  likedSongs: Music[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Playlist.name }],
  })
  playlists: Playlist[];

  @Prop()
  verificationCode: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
