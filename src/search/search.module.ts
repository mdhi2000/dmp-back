import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Music, MusicSchema } from 'src/music/schemas/music.schema';
import { Artist, ArtistSchema } from 'src/artist/schemas/artist.schema';
import { Playlist, PlaylistSchema } from 'src/playlist/schemas/playlist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Music.name, schema: MusicSchema },
      { name: Artist.name, schema: ArtistSchema },
      { name: Playlist.name, schema: PlaylistSchema },
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
