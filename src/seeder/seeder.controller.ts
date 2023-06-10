import { SeederService } from './seeder.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArtistSeedDto } from './dto/artists-seed.dto';
import { MusicSeedDto } from './dto/music-seeder.dto';

@ApiTags('seeder')
@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Get('moods')
  seedMoods() {
    return this.seederService.seedMoods();
  }

  @Post('artists')
  seedArtists(@Body() artists: ArtistSeedDto[]) {
    return this.seederService.seedArtists(artists);
  }

  @Post('songs')
  seedSongs(@Body() musics: MusicSeedDto[]) {
    // console.log(musics);
    // return musics;
    return this.seederService.seedSongs(musics);
  }
}
