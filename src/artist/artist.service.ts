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

  convertNumberFormat(number) {
    const multiplier = {
      K: 1e3,
      M: 1e6,
      B: 1e9,
      T: 1e12,
    };

    const value = parseFloat(number);
    const suffix = number.slice(-1).toUpperCase();
    const isValidNumber = !isNaN(value);

    if (
      isValidNumber &&
      (multiplier.hasOwnProperty(suffix) || !isNaN(parseFloat(suffix)))
    ) {
      const normalizedValue = multiplier.hasOwnProperty(suffix)
        ? value * multiplier[suffix]
        : value;
      return normalizedValue;
    }

    return 0;
  }

  seed(
    artists: {
      name: string;
      plays: number;
      photo: string;
      photo_player: string;
      photo_thumb: string;
      background: string;
      share_link: string;
      following: boolean;
      followers_count: number;
    }[],
  ) {
    for (const artist of artists.slice(0, 10)) {
      artist.plays = this.convertNumberFormat(artist.plays);
      console.log(artist);
      const createdArtist = new this.artistModel(artist);
      console.log(createdArtist);
      createdArtist.save();
    }
  }

  // findAll() {
  //   return this.artistModel.find();
  // }

  findOne(id: string) {
    return this.artistModel.findById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistModel.findByIdAndUpdate(updateArtistDto);
  }

  remove(id: string) {
    return this.artistModel.findByIdAndDelete(id);
  }
}
