import { Schema } from '@nestjs/mongoose';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Req,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';
import { User, UserDocument } from 'src/user/schemas/user.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @Post('login')
  @ApiTags('Done')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiBody({
    description: 'use "123456" if you want to bypass verification',
    type: VerifyEmailDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'accessToken',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access: invalid code',
  })
  @ApiTags('Done')
  @Post('verify')
  verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'user is not authorized/logged in',
  })
  @ApiOkResponse({
    description: "User's data",
    type: User,
  })
  @ApiTags('Done')
  getMe(@Req() req: Request & { currentUser: UserDocument }) {
    return req.currentUser;
  }
}
