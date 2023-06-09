import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Mood, MoodSchema } from 'src/mood/schemas/mood.schema';
import { UserMood, UserMoodSchema } from 'src/user/schemas/user-moods.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Mood.name, schema: MoodSchema }]),
    MongooseModule.forFeature([
      { name: UserMood.name, schema: UserMoodSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
