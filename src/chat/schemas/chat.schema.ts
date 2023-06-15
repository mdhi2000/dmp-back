import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Music } from 'src/music/schemas/music.schema';
import { ChatQuestion } from './chat-question.schemas';
import { User } from 'src/user/schemas/user.schema';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  toObject: {
    virtuals: true,
    getters: true,
  },
})
export class Chat {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @ApiProperty()
  user: User;

  @Prop()
  @ApiProperty()
  query: string;

  @Prop({ enum: ['question', 'musics'] })
  @ApiProperty()
  response_type: string;

  @ApiProperty()
  response: Music[] | ChatQuestion;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Music.name }] })
  @ApiProperty({ nullable: true })
  musicsResult: Music[];

  @ApiProperty({ type: ChatQuestion, nullable: true })
  questionResult: ChatQuestion;
}

const ChatSchema = SchemaFactory.createForClass(Chat);

ChatSchema.virtual('questionResult', {
  ref: ChatQuestion.name,
  localField: '_id',
  foreignField: 'chat',
  justOne: true,
});

ChatSchema.virtual('response').get(function () {
  return this.response_type === 'question'
    ? this.questionResult
    : this.musicsResult;
});

export { ChatSchema };
