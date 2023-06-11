import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from 'src/artist/schemas/artist.schema';
import { ArtistSeedDto } from './dto/artists-seed.dto';
import { MusicSeedDto } from './dto/music-seeder.dto';
import { Music, MusicDocument } from 'src/music/schemas/music.schema';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<Artist>,
    @InjectModel(Music.name) private musicModel: Model<MusicDocument>,
  ) {}
  seedMoods() {
    return;
  }

  async seedArtists(artists: ArtistSeedDto[]) {
    const insertedArtists = [];
    for (const artist of artists) {
      const insertableArtist = {
        ...artist,
        plays: this.convertNumberFormat(artist.plays),
        music: [],
      };
      const createdArtist = await this.artistModel.findOneAndUpdate(
        {
          name: insertableArtist.name,
        },
        insertableArtist,
        {
          new: true, // Return the updated document
          upsert: true, // Create if not exists
          setDefaultsOnInsert: true, // Apply default values if creating a new document
        },
      );
      insertedArtists.push(createdArtist);
    }
    return insertedArtists;
  }

  async seedSongs(musics: MusicSeedDto[]) {
    const insertedMusics = [];
    for (const music of musics) {
      const artist = await this.artistModel.findOne({ name: music.artist });
      const insertableMusic = {
        ...music,
        externalId: music.id,
        artist,
      };
      const createdMusic = await this.musicModel.findOneAndUpdate(
        {
          externalId: insertableMusic.id,
        },
        insertableMusic,
        {
          new: true, // Return the updated document
          upsert: true, // Create if not exists
          setDefaultsOnInsert: true, // Apply default values if creating a new document
        },
      );
      // console.log(createdMusic);
      // let tempMusics = artist.musics;
      // tempMusics.push(createdMusic);
      // tempMusics = [...new Set(tempMusics)];
      // console.log(tempMusics);
      // artist.updateOne({ $push: { musics: createdMusic } }).exec();
      artist.musics.push(createdMusic);
      artist.save();

      insertedMusics.push(createdMusic);
    }
    return insertedMusics;
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
}
