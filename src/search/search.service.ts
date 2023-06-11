import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { Artist, ArtistDocument } from 'src/artist/schemas/artist.schema';
import { Music, MusicDocument } from 'src/music/schemas/music.schema';
import {
  Playlist,
  PlaylistDocument,
} from 'src/playlist/schemas/playlist.schema';
import finglishToPersian from 'src/utils/finglishToFa.helpers';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Music.name) private musicModel: PaginateModel<MusicDocument>,
    @InjectModel(Artist.name)
    private artistModel: PaginateModel<ArtistDocument>,
    @InjectModel(Playlist.name)
    private playlistModel: PaginateModel<PlaylistDocument>,
  ) {}

  async search(query: string) {
    console.log(query);
    const terms = query.split(' ').map((term) => this.escapeRegExp(term));
    const regexPattern = terms.map((term) => `(?=${term}).*`).join('');
    const regex = new RegExp(`${regexPattern}`, 'ig');

    /* v2:
    // const terms = query.split(' ').map((term) => this.escapeRegExp(term));
    // const regex = new RegExp(`\\b${terms.join('\\b.*\\b')}\\b`, 'ig');
    */
    console.log(regex);
    /*v1:
     * const regex = new RegExp(this.escapeRegExp(query), 'i');
     */
    const searchConditions = [
      { name: { $regex: regex } },
      { title: { $regex: regex } },
      { faName: { $regex: regex } },
      { faTitle: { $regex: regex } },
      { lyric: { $regex: regex } },
      { artist_tags: { $in: terms } },
    ];

    const [artists, playlists, musics] = await Promise.all([
      this.artistModel
        .find({ $or: searchConditions })
        .sort({ followers_count: 'desc', plays: 'desc' })
        .populate('musics')
        .limit(50)
        .lean()
        .exec(),
      this.playlistModel
        .find({ $or: searchConditions })
        .limit(50)
        .lean()
        .exec(),
      this.musicModel
        .find({ $or: searchConditions })
        .sort({ plays: 'desc' })
        .limit(50)
        .populate(['artist'])
        .lean()
        .exec(),
    ]);

    return {
      artists: artists,
      playlists,
      musics: musics,
    };
  }

  private escapeRegExp(query: string): string {
    return query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
}
