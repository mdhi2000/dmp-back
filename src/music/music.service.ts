import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Music, MusicDocument } from './schemas/music.schema';
import mongoose, { PaginateModel } from 'mongoose';
import { Artist, ArtistDocument } from 'src/artist/schemas/artist.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class MusicService {
  constructor(
    @InjectModel(Music.name) private musicModel: PaginateModel<MusicDocument>,
    @InjectModel(Artist.name)
    private artistModel: PaginateModel<ArtistDocument>,
    @InjectModel(User.name)
    private userModel: PaginateModel<UserDocument>,
  ) {}
  create(createMusicDto: CreateMusicDto) {
    const createdMusic = new this.musicModel(createMusicDto);
    createdMusic.save();
    return createdMusic;
  }

  async findAll(page: number, limit: number) {
    const options = {
      page,
      limit,
      populate: ['artist', 'mood'],
    };
    return await this.musicModel.paginate({}, options);
  }

  async findOne(id: string) {
    return [await this.musicModel.findById(id).populate(['artist', 'mood'])];
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    return `This action updates a #${id} music`;
  }

  remove(id: number) {
    return `This action removes a #${id} music`;
  }

  async getRadio(id: string) {
    const music = await this.musicModel.findById(id).lean().exec();
    const radio = await this.musicModel
      .find({
        kmeans_label: music.kmeans_label,
      })
      .lean()
      .exec();
    const artist = await this.artistModel.findById(music.artist).populate({
      path: 'musics',
      options: { sort: { downloads: 'desc', plays: 'desc' }, limit: 5 },
    });
    // music.artist.musics = music.artist.musics ?? [];
    // console.log(artist.musics);
    console.log(
      this.shuffle([...radio, ...artist.musics]),
      this.shuffle([...radio, ...artist.musics]).length,
      radio.length,
    );
    return this.shuffle([...radio, ...artist.musics]);
  }

  async play(id: string) {
    const music = await this.musicModel.findById(id).lean().exec();
    const radio = await this.getRadio(music._id.toString());

    return { ...music, radio };
  }

  shuffle<T>(array: Array<T>): Array<T> {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  async likeSong(userId: string, songId: string) {
    if (
      (
        await this.userModel.find({
          _id: userId,
          likedSongs: {
            $in: [new mongoose.Types.ObjectId(songId)],
          },
        })
      ).length > 0
    ) {
      return this.userModel
        .findByIdAndUpdate(
          userId,
          {
            $pullAll: { likedSongs: [{ _id: songId }] },
          },
          { new: true },
        )
        .populate('likedSongs', 'dislikedSongs');
    }
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $push: { likedSongs: { _id: songId } },
        },
        { new: true },
      )
      .populate('likedSongs', 'dislikedSongs');
  }

  async dislikeSong(userId: string, songId: string) {
    if (
      (
        await this.userModel.find({
          _id: userId,
          dislikedSongs: {
            $in: [new mongoose.Types.ObjectId(songId)],
          },
        })
      ).length > 0
    ) {
      return this.userModel
        .findByIdAndUpdate(
          userId,
          {
            $pullAll: { dislikedSongs: [{ _id: songId }] },
          },
          { new: true },
        )
        .populate('likedSongs', 'dislikedSongs');
    }
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $push: { dislikedSongs: { _id: songId } },
        },
        { new: true },
      )
      .populate('likedSongs', 'dislikedSongs');
  }
}
