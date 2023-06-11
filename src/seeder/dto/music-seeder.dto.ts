import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class MusicSeedDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  artist: string;

  @ApiProperty()
  artist_tags: string[];

  @ApiProperty()
  @IsNumber()
  plays: number;

  @ApiProperty()
  @IsNumber()
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
  @IsNumber()
  like: number;

  @ApiProperty()
  @IsNumber()
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
  @IsNumber()
  duration: number;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  lyric: string;

  @ApiProperty()
  kmeans_label: string;
}
