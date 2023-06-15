import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InitMoodsDto } from './dto/init-moods.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Request } from 'express';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('')
  @ApiTags('Done')
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  updateAuthUser(
    @Req() req: Request & { currentUser: UserDocument },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const currentUser: UserDocument = req.currentUser;
    return this.userService.update(currentUser.id, updateUserDto);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('profile')
  @UseGuards(AuthGuard)
  @ApiBody({ type: UpdateProfileDto })
  @ApiBearerAuth()
  @ApiTags('Done')
  updateProfilePicture(@Body('profile_data') profile: string) {
    return this.userService.setUserProfile(profile);
  }

  @Post('initmoods')
  @ApiBody({ type: [InitMoodsDto] })
  @ApiTags('Done')
  initMoods(@Body() initMoodsDto: InitMoodsDto[]) {
    this.userService.initMoods(initMoodsDto);
  }
}
