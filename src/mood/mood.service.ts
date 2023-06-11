import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mood, MoodDocument } from './schemas/mood.schema';
import { Model } from 'mongoose';

@Injectable()
export class MoodService {
  constructor(@InjectModel(Mood.name) private moodModel: Model<MoodDocument>) {}

  // create(createMoodDto: CreateMoodDto) {
  //   return 'This action adds a new mood';
  // }

  findAll() {
    return this.moodModel.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} mood`;
  // }

  // update(id: number, updateMoodDto: UpdateMoodDto) {
  //   return `This action updates a #${id} mood`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} mood`;
  // }
}
