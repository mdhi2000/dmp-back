import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Artist } from './schemas/artist.schema';
import { PaginateResult } from 'mongoose';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns Artist',
  })
  @ApiQuery({
    name: 'page',
    allowEmptyValue: true,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    allowEmptyValue: true,
    required: false,
  })
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<PaginateResult<Artist>> {
    return this.artistService.findAll(page || 1, limit || 20);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns Artist',
    type: Artist,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns Artist',
    type: Artist,
  })
  @Get(':id/musics')
  getMusics(@Param('id') id: string) {
    return this.artistService.getArtistMusics(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistService.remove(id);
  }
}
