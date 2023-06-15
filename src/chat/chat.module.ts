import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schemas/chat.schema';
import {
  ChatQuestion,
  ChatQuestionSchema,
} from './schemas/chat-question.schemas';
import {
  ChatQuestionOption,
  ChatQuestionOptionSchema,
} from './schemas/chat-question-option.schema';
import { Mood, MoodSchema } from 'src/mood/schemas/mood.schema';
import { Music, MusicSchema } from 'src/music/schemas/music.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: ChatSchema, name: Chat.name },
      { schema: ChatQuestionSchema, name: ChatQuestion.name },
      { schema: ChatQuestionOptionSchema, name: ChatQuestionOption.name },
      { schema: MoodSchema, name: Mood.name },
      { schema: MusicSchema, name: Music.name },
      { schema: UserSchema, name: User.name },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
