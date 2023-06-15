import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InitMoodsDto } from './dto/init-moods.dto';
import { Mood, MoodDocument } from 'src/mood/schemas/mood.schema';
import { UserMood, UserMoodDocument } from './schemas/user-moods.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserMood.name) private userMoodModel: Model<UserMoodDocument>,
    @Inject(REQUEST) private request: Request & { currentUser: UserDocument },
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async setUserProfile(profile: string) {
    const user = this.request.currentUser;
    user.profilePicture = profile;
    user.save();
    return user;
  }

  async initMoods(ids: InitMoodsDto[]) {
    const user: UserDocument = this.request.currentUser;
    const userMoods = [];
    for (const id of ids) {
      const userMood = await this.userMoodModel.updateMany(
        { mood: id, user },
        { $set: { weight: 0.5 } },
        { new: true },
      );
      userMoods.push(userMood);
    }
    return userMoods;
  }
}
