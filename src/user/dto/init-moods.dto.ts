import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InitMoodsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
