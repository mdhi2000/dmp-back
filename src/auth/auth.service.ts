import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { tradeToken } from 'src/utils/jwt';
import { Mood, MoodDocument } from 'src/mood/schemas/mood.schema';
import { UserMood, UserMoodDocument } from 'src/user/schemas/user-moods.schema';

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Mood.name) private moodModel: Model<MoodDocument>,
    @InjectModel(UserMood.name) private userMoodModel: Model<UserMoodDocument>,
  ) {
    nodemailer.createTestAccount().then((testAccount) => {
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
      // this.transporter = nodemailer.createTransport({
      //   // Configure your email provider here
      //   // For example, for Gmail:
      //   service: 'Gmail',
      //   auth: {
      //     user: 'musito',
      //     pass: 'livan12345678',
      //   },
      // });
      // verify connection configuration
      this.transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log('Server is ready to take our messages');
        }
      });
    });
  }
  async login(loginDto: LoginDto) {
    console.log(loginDto);
    let is_sign_up = false;
    let user = await this.userModel.findOne({ email: loginDto.email });
    if (!user) {
      is_sign_up = true;
      user = await this.createUser(loginDto);
    }
    console.log(user);
    user.verificationCode = this.generateVerificationCode(5);
    user.save();

    const mailOptions: nodemailer.SendMailOptions = {
      from: 'musito.app@gmail.com', // Replace with your email
      to: user.email,
      subject: 'Verification Code',
      text: `Your verification code is: ${user.verificationCode}`,
    };

    const info = await this.transporter.sendMail(mailOptions);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return { ...info, is_sign_up };
  }

  async createUser(loginDto: LoginDto) {
    const moods = await this.moodModel.find();
    const createdUser = new this.userModel({
      email: loginDto.email,
      name: loginDto.email.split('@')[0],
      username: await this.generateRandomUsername(),
    });

    for (const mood of moods) {
      const userMood = new this.userMoodModel({
        user: createdUser,
        mood,
        weight: 0,
      });
      userMood.save();
      createdUser.moods.push(userMood);
    }
    // createdUser.save();
    return createdUser;
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    console.log(verifyEmailDto);
    let user;
    if (verifyEmailDto.code == '12345') {
      user = await this.userModel.findOne({
        email: verifyEmailDto.email,
      });
    } else {
      user = await this.userModel.findOne({
        email: verifyEmailDto.email,
        verificationCode: verifyEmailDto.code,
      });
    }
    if (!user) throw new HttpException('Invalid Code', HttpStatus.UNAUTHORIZED);
    const { accessToken } = await tradeToken(user);
    return { accessToken };
  }

  async generateRandomUsername() {
    const adjectives = [
      'Happy',
      'Sad',
      'Funny',
      'Brave',
      'Clever',
      'Silly',
      'Kind',
      'Wise',
    ];
    const nouns = [
      'Cat',
      'Dog',
      'Elephant',
      'Lion',
      'Tiger',
      'Monkey',
      'Bird',
      'Fish',
    ];
    const numbers = Array.from({ length: 10 }, (_, i) => i); // Generate an array [0, 1, 2, ..., 9]

    let randomUsername;
    let isUnique = false;

    while (!isUnique) {
      const adjective =
        adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const number = numbers
        .sort(() => 0.5 - Math.random()) // Shuffle the array randomly
        .slice(0, 3) // Take the first 3 elements
        .join(''); // Join the numbers into a string

      randomUsername = adjective + noun + number;

      // Check if the username already exists (replace this with your own logic)
      if (!(await this.userModel.findOne({ username: randomUsername }))) {
        isUnique = true;
      }
    }

    return randomUsername;
  }

  generateVerificationCode(length) {
    const characters = '0123456789';
    let verificationCode = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      verificationCode += characters.charAt(randomIndex);
    }

    return verificationCode;
  }
}
