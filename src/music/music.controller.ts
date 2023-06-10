import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Music } from './schemas/music.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('music')
@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post()
  create(@Body() createMusicDto: CreateMusicDto) {
    return this.musicService.create(createMusicDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns Artist',
    type: [Music],
  })
  @ApiQuery({
    name: 'page',
    allowEmptyValue: true,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    allowEmptyValue: true,
    required: false,
  })
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.musicService.findAll(page || 1, limit || 20);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Returns music by id',
    type: Music,
  })
  findOne(@Param('id') id: string) {
    return this.musicService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicService.update(+id, updateMusicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicService.remove(+id);
  }

  @Get('play/:id')
  play(@Param('id') id: string) {
    return this.musicService.play(id);
  }

  @Get('radio/:id')
  radio(@Param('id') id: string) {
    return this.musicService.getRadio(id);
  }

  @Get('like/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  like(@Param('id') id: string, @Req() req) {
    return this.musicService.likeSong(req.body.currentUser.id, id);
  }
}
