import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from 'src/artist/schemas/artist.schema';
import { ArtistSeedDto } from './dto/artists-seed.dto';
import { MusicSeedDto } from './dto/music-seeder.dto';
import { Music, MusicDocument } from 'src/music/schemas/music.schema';
import { Mood } from 'src/mood/schemas/mood.schema';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<Artist>,
    @InjectModel(Music.name) private musicModel: Model<MusicDocument>,
    @InjectModel(Mood.name) private moodModel: Model<MusicDocument>,
  ) {}
  seedMoods() {
    return;
    const moods = [
      {
        name: 'happy',
        faName: 'شاد',
        cover: '/assets/moods/_e2b99a2f-c1ce-4b95-8967-0347880c78c4.jpeg',
      },
      {
        name: 'sad',
        faName: 'غمگین',
        cover: '/assets/moods/_9e496d3e-6334-4cb6-a642-b3c6253e803e.jpeg',
        useOpposite: true,
        oppositeName: 'happy',
      },
      {
        name: 'energetic',
        faName: 'انرژی بخش',
        cover: '/assets/moods/_9d921a64-d593-4cc8-a4e2-b99b7bc19e12.jpeg',
      },
      {
        name: 'relaxing',
        faName: 'آرامش بخش',
        cover: '/assets/moods/_190e1d21-a485-430d-ac0d-21a338740293.jpeg',
      },
      {
        name: 'gathering',
        faName: 'دورهمی',
        cover: '/assets/moods/_a1d0ed94-3f30-448c-b526-e0345430780d.jpeg',
      },
      {
        name: 'road',
        faName: 'جاده',
        cover: '/assets/moods/_65fd20f0-3fb7-4d74-9a57-e0fbce16e0ab.jpeg',
      },
      {
        name: 'love',
        faName: 'عاشقانه',
        cover: '/assets/moods/_7d9c5e73-3682-46ce-8615-f9418f1ef198.jpeg',
      },
      {
        name: 'epic',
        faName: 'حماسی',
        cover: '/assets/moods/_7b43b05a-5c6b-4281-b243-63b386462e3f.jpeg',
      },
    ];
    return this.moodModel.insertMany(moods);
  }

  async seedArtists(artists: ArtistSeedDto[]) {
    return;
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
    return;
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
