export class CreateMusicDto {
  externalId: string;

  name: string;

  artist: string;

  artist_tags: string[];

  plays: number;

  downloads: number;

  permlink: string;

  photo: string;

  photo_player: string;

  share_link: string;

  title: string;

  credits?: string;

  like: number;

  dislike: number;

  link: string;

  hq_link: string;

  lq_link: string;

  hls_link: string;

  hq_hls: string;

  lq_hls: string;

  album: string;

  date: string;

  duration: number;

  thumbnail: string;

  lyric: string;

  kmeans_label: string;
}
