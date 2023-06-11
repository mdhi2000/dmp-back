import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAutoPlaylistDto {
  @ApiProperty()
  @IsNotEmpty()
  prompts: string[];
}
