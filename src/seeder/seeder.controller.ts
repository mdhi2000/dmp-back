import { SeederService } from './seeder.service';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('seeder - not implemented', 'not implemented')
@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Get('moods')
  seedMoods() {
    return this.seederService.seedMoods();
  }

  @Get('artists')
  seedArtists() {
    return this.seederService.seedArtists();
  }

  @Get('songs')
  seedSongs() {
    return this.seederService.seedSongs();
  }
}
