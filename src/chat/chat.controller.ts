import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Mood } from 'src/mood/schemas/mood.schema';
import { Music } from 'src/music/schemas/music.schema';
import { ChatQuestion } from './schemas/chat-question.schemas';
import { AuthGuard } from 'src/auth/auth.guard';
import { CallBackDto } from './dto/callback.dto';

class RequestResponse {
  @ApiProperty()
  response_type: string;

  @ApiProperty()
  detectedMood: Mood;

  @ApiProperty()
  response: Music[] | ChatQuestion;
}

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiTags('Done')
  @ApiQuery({ name: 'q', description: 'Query string', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RequestResponse,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('request')
  request(@Query('q') query: string) {
    return this.chatService.answerRequest(query);
  }

  @Get('history')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('Done')
  getChatHistory() {
    return this.chatService.getChatHistory();
  }

  @Get('history/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('Done')
  @ApiParam({
    name: 'id',
  })
  getChatHistoryById(@Param('id') id: string) {
    return this.chatService.getChatHistoryById(id);
  }

  @Post('callback')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('Done')
  @ApiBody({ type: CallBackDto })
  callBack(@Body('option_key') option_key: string) {
    return this.chatService.sendCallBackQuery(option_key);
  }
}
