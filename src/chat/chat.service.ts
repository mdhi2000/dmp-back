import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mood, MoodDocument } from 'src/mood/schemas/mood.schema';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { Music, MusicDocument } from 'src/music/schemas/music.schema';
import {
  ChatQuestion,
  ChatQuestionDocument,
} from './schemas/chat-question.schemas';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  ChatQuestionOption,
  ChatQuestionOptionDocument,
} from './schemas/chat-question-option.schema';
import { UserDocument } from 'src/user/schemas/user.schema';
import { IQuestionResponse } from './interfaces/question-response.interface';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Mood.name) private moodModel: Model<MoodDocument>,

    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(ChatQuestion.name)
    private chatQuestionModel: Model<ChatQuestionDocument>,
    @InjectModel(ChatQuestionOption.name)
    private chatQuestionOptionModel: Model<ChatQuestionOptionDocument>,

    @InjectModel(Music.name) private musicModel: Model<MusicDocument>,

    @Inject(REQUEST) private request: Request & { currentUser: UserDocument },
  ) {}

  async answerRequest(query: string) {
    const detectedMood = await this.detectMood(query);
    let result: ChatDocument;
    let response: Music[] | IQuestionResponse;
    if (detectedMood.useOpposite) {
      response = {
        question: 'دوست داری حس الانت رو تقویت کنی یا برات عوضش کنم',
        answers: [
          {
            option_text: 'حسمو تقویت کن',
            option_key: `moodOpposite ${detectedMood.id}`,
          },
          {
            option_text: 'حسمو عوض کن',
            option_key: `moodOpposite ${detectedMood.id}`,
          },
        ],
      };
      result = await this.saveRequest(query, {
        question: response,
      });
    } else {
      response = await this.findMusics(detectedMood);
      result = await this.saveRequest(query, {
        musics: response,
      });
    }

    return {
      response_type: result.response_type,
      detectedMood,
      response,
    };
  }

  async sendCallBackQuery(callbackData: string) {
    if (callbackData.match(/^moodOpposite (.*)/)) {
      const moodId = callbackData.match(/^moodOpposite (.*)/)[1];
      const mood = await this.moodModel.findById(moodId);
      return {
        response_type: 'musics',
        detectedMood: mood,
        response: await this.findMusics(mood),
      };
    } else throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  }

  async detectMood(query: string) {
    const count = await this.moodModel.countDocuments().exec();
    const randomIndex = Math.floor(Math.random() * count);
    return this.moodModel.findOne().skip(randomIndex).exec();
  }

  getChatHistory() {
    const user = this.request.currentUser;
    return this.chatModel
      .find({ user })
      .sort({ createdAt: 'desc' })
      .limit(5)
      .exec();
  }

  getChatHistoryById(id: string) {
    return this.chatModel
      .findOne({ _id: id, user: this.request.currentUser })
      .populate('musicsResult questionResult user')
      .exec();
  }

  saveRequest(
    query: string,
    response: {
      musics?: Music[];
      question?: IQuestionResponse;
    },
  ) {
    const user = this.request.currentUser;
    let chat: ChatDocument;
    if (response?.musics?.length > 0) {
      chat = new this.chatModel({
        user,
        query,
        musicsResult: response?.musics,
        response_type: 'musics',
      });
      chat.save();
    } else if (response?.question) {
      chat = new this.chatModel({ user, query, response_type: 'question' });
      chat.save();
      this.saveQuestion(chat, response?.question);
    } else throw new Error('Invalid Input');
    return chat.populate('questionResult');
  }

  saveQuestion(chat: Chat, question: IQuestionResponse) {
    const chatQuestion = new this.chatQuestionModel({
      chat,
      question: question.question,
    });
    chatQuestion.save();
    this.chatQuestionOptionModel.insertMany(
      question.answers.map((answer) => ({ ...answer, question: chatQuestion })),
    );
    return chatQuestion.populate('answers');
  }

  async findMusics(mood: Mood) {
    return await this.musicModel.aggregate().sample(21).exec();
  }
}
