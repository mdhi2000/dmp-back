import { Controller, Get, HttpStatus } from '@nestjs/common';
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

  // @Get('assign')
  // @
  // assign(){

  // }
}
