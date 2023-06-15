import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CallBackDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  option_key: string;
}
