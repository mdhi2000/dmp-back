import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ChatQuestion } from './chat-question.schemas';

export type ChatQuestionOptionDocument = HydratedDocument<ChatQuestionOption>;

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
export class ChatQuestionOption {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ChatQuestion' })
  @ApiProperty()
  question: ChatQuestion;

  @Prop()
  option_text: string;

  @Prop()
  option_key: string;
}

export const ChatQuestionOptionSchema =
  SchemaFactory.createForClass(ChatQuestionOption);
