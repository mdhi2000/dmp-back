import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiOkResponse, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Artist } from 'src/artist/schemas/artist.schema';
import { Music } from 'src/music/schemas/music.schema';
import { Playlist } from 'src/music/schemas/playlist.schema';

class SearchResult {
  @ApiProperty({
    type: [Artist],
  })
  artists: Artist[];

  @ApiProperty({
    type: [Music],
  })
  musics: Music[];

  @ApiProperty({
    type: [Playlist],
  })
  playlists: Playlist[];
}

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiQuery({
    name: 's',
    description: 'search string',
  })
  @ApiOkResponse({
    description: 'returns search result in musics, artists, playlists',
    type: SearchResult,
  })
  search(@Query('s') searchQuery: string) {
    if (!searchQuery)
      throw new HttpException('invalid search query', HttpStatus.BAD_REQUEST);
    return this.searchService.search(searchQuery);
  }
}
