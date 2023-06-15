import { Module } from '@nestjs/common';
// import { SeedCommand } from './seed';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from 'src/artist/schemas/artist.schema';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';
import { Music, MusicSchema } from 'src/music/schemas/music.schema';
import { Mood, MoodSchema } from 'src/mood/schemas/mood.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Artist.name, schema: ArtistSchema },
      { name: Music.name, schema: MusicSchema },
      { name: Mood.name, schema: MoodSchema },
    ]),
  ],
  controllers: [SeederController],
  providers: [SeederService],
  // providers: [SeedCommand],
})
export class SeederModule {}
