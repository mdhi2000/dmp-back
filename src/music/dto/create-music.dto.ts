import { ApiProperty } from '@nestjs/swagger';

export class CreateMusicDto {
  @ApiProperty()
  externalId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  artist: string;

  @ApiProperty()
  artist_tags: string[];

  @ApiProperty()
  plays: number;

  @ApiProperty()
  downloads: number;

  @ApiProperty()
  permlink: string;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  photo_player: string;

  @ApiProperty()
  share_link: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  credits?: string;

  @ApiProperty()
  like: number;

  @ApiProperty()
  dislike: number;

  @ApiProperty()
  link: string;

  @ApiProperty()
  hq_link: string;

  @ApiProperty()
  lq_link: string;

  @ApiProperty()
  hls_link: string;

  @ApiProperty()
  hq_hls: string;

  @ApiProperty()
  lq_hls: string;

  @ApiProperty()
  album: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  lyric: string;

  @ApiProperty()
  kmeans_label: string;
}
