import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mood, MoodDocument } from './schemas/mood.schema';
import { Model } from 'mongoose';
import { Music, MusicDocument } from 'src/music/schemas/music.schema';

@Injectable()
export class MoodService {
  constructor(
    @InjectModel(Mood.name) private moodModel: Model<MoodDocument>,
    @InjectModel(Music.name) private musicModel: Model<MusicDocument>,
  ) {}

  // create(createMoodDto: CreateMoodDto) {
  //   return 'This action adds a new mood';
  // }

  findAll() {
    return this.moodModel.find().populate('opposite').lean().exec();
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

  // assignLabel() {}

  async getNextMusic() {
    return (
      await this.musicModel
        .aggregate([
          {
            $group: {
              _id: '$kmeans_label',
              items: { $push: '$$ROOT' },
              count: { $sum: 1 },
              hasMoodCount: {
                $sum: {
                  $cond: [
                    {
                      $and: [
                        { $ne: ['$moods', undefined] },
                        { $isArray: '$moods' },
                      ],
                    },
                    { $cond: [{ $gt: [{ $size: '$moods' }, 0] }, 1, 0] },
                    0,
                  ],
                },
              },
            },
          },
          {
            $match: {
              $or: [
                { hasMoodCount: { $lt: 2 } },
                { $and: [{ count: { $lt: 2 } }, { hasMoodCount: { $lt: 1 } }] },
              ],
            },
          },
          { $sample: { size: 1 } },
          { $unwind: '$items' },
          { $replaceRoot: { newRoot: '$items' } },
          { $sample: { size: 1 } },
        ])
        .exec()
    )[0];
  }
}
