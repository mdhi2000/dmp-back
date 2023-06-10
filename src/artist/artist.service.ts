import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Model, PaginateModel } from 'mongoose';
import { Artist, ArtistDocument } from './schemas/artist.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Music, MusicDocument } from 'src/music/schemas/music.schema';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name)
    private artistModel: PaginateModel<ArtistDocument>,
    @InjectModel(Music.name)
    private musicModel: PaginateModel<MusicDocument>,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const artist = new this.artistModel(createArtistDto);
    artist.save();
    return artist;
  }

  findAll(page: number, limit: number) {
    const options = {
      page,
      limit,
    };
    return this.artistModel.paginate({}, options);
  }

  async findOne(id: string) {
    return [await this.artistModel.findById(id).populate('musics')];
  }

  async getArtistMusics(id: string) {
    return (await this.artistModel.findById(id).populate('musics')).musics;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistModel.findByIdAndUpdate(updateArtistDto);
  }

  remove(id: string) {
    return this.artistModel.findByIdAndDelete(id);
  }
}
