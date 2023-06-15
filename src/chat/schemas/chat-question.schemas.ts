import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Music } from 'src/music/schemas/music.schema';
import { User } from 'src/user/schemas/user.schema';
import { Chat } from './chat.schema';
import { ChatQuestionOption } from './chat-question-option.schema';

export type ChatQuestionDocument = HydratedDocument<ChatQuestion>;

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
export class ChatQuestion {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' })
  @ApiProperty()
  chat: Chat;

  @Prop()
  @ApiProperty()
  question: string;

  @ApiProperty({ type: [ChatQuestionOption] })
  answers;
}

const ChatQuestionSchema = SchemaFactory.createForClass(ChatQuestion);

ChatQuestionSchema.virtual('answers', {
  ref: ChatQuestionOption.name,
  localField: '_id',
  foreignField: 'question',
});

export { ChatQuestionSchema };
