import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './schemas/artist.schema';
import { Music, MusicSchema } from '../music/schemas/music.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Music.name, schema: MusicSchema }]),
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
