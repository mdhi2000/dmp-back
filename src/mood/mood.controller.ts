import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { MoodService } from './mood.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Mood } from './schemas/mood.schema';

@ApiTags('mood')
@Controller('mood')
export class MoodController {
  constructor(private readonly moodService: MoodService) {}

  // @Post()
  // create(@Body() createMoodDto: CreateMoodDto) {
  //   return this.moodService.create(createMoodDto);
  // }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'returns all available moods',
    type: Mood,
  })
  @Get()
  @ApiTags('Done')
  findAll() {
    return this.moodService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.moodService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMoodDto: UpdateMoodDto) {
  //   return this.moodService.update(+id, updateMoodDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.moodService.remove(+id);
  // }

  @Get('assign/next')
  getNextMusic() {
    console.log('mood/assign/next');
    return this.moodService.getNextMusic();
  }

  @Get('assign/:musicId/:moodId')
  assign(@Param('musicId') musicId: string, @Param('moodId') moodId: string) {
    return this.moodService.assignLabel(musicId, moodId);
  }

  @Get('revoke/:musicId/:moodId')
  revoke(@Param('musicId') musicId: string, @Param('moodId') moodId: string) {
    return this.moodService.revokeLabel(musicId, moodId);
  }
}
