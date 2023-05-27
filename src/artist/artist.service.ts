import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Model } from 'mongoose';
import { Artist } from './schemas/artist.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ArtistService {
  constructor(@InjectModel(Artist.name) private artistModel: Model<Artist>) {}

  create(createArtistDto: CreateArtistDto) {
    const artist = new this.artistModel(createArtistDto);
    artist.save();
    return artist;
  }

  findAll() {
    return this.artistModel.find();
  }

  findOne(id: string) {
    return this.artistModel.findById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistModel.findByIdAndUpdate(updateArtistDto);
  }

  remove(id: string) {
    return `This action removes a #${id} artist`;
  }
}
