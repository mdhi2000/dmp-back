import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ArtistSeedDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  plays: string;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  photo_player: string;

  @ApiProperty()
  photo_thumb: string;

  @ApiProperty()
  background: string;

  @ApiProperty()
  share_link: string;

  @ApiProperty()
  @IsNumber()
  followers_count: number;
}
