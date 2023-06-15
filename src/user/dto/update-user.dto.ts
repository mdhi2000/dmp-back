import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDate, IsEmail, IsIn, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsIn(['male', 'female', 'other'])
  gender: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  birthday: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  profilePicture: string;
}
