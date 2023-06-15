import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsIn(['male', 'female', 'other'])
  gender: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  birthday: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  profilePicture: string;
}
