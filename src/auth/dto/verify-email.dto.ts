import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyEmailDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'email@example.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  code: string;
}
