import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { UserDocument } from 'src/music/schemas/music.schema';
import * as nodemailer from 'nodemailer';
import { tradeToken } from 'src/utils/jwt';

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter;
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
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
    let user = await this.userModel.findOne({ email: loginDto.email });
    if (!user)
      user = new this.userModel({
        email: loginDto.email,
        username: await this.generateRandomUsername(),
      });
    console.log(user);
    user.verificationCode = this.generateVerificationCode(6);
    user.save();

    const mailOptions: nodemailer.SendMailOptions = {
      from: 'musito.app@gmail.com', // Replace with your email
      to: user.email,
      subject: 'Verification Code',
      text: `Your verification code is: ${user.verificationCode}`,
    };

    const info = await this.transporter.sendMail(mailOptions);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return info;
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const user = await this.userModel.findOne({
      email: verifyEmailDto.email,
      verificationCode: verifyEmailDto.code,
    });
    if (!user) throw new HttpException('Invalid Code', HttpStatus.UNAUTHORIZED);
    const { accessToken } = await tradeToken(user);
    return accessToken;
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
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let verificationCode = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      verificationCode += characters.charAt(randomIndex);
    }

    return verificationCode;
  }
}
