import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  profile_data: string;
}
