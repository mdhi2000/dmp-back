import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from 'src/artist/schemas/artist.schema';

@Injectable()
export class SeederService {
  constructor(@InjectModel(Artist.name) private artistModel: Model<Artist>) {}
  seedMoods() {
    return;
  }

  seedArtists() {
    return;
  }

  seedSongs() {
    return;
  }
}
