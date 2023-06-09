import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { CreateAutoPlaylistDto } from './dto/create-auto-playlist.dto';

@Injectable()
export class PlaylistService {
  create(createPlaylistDto: CreatePlaylistDto) {
    return 'This action adds a new playlist';
  }

  findAll() {
    return `This action returns all playlist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlist`;
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }

  async createAutoPlaylist(createAutoPlaylistDto: CreateAutoPlaylistDto) {
    // const { default: bingImageCreator } = await import('bimg');
    // const generatedImages = bingImageCreator.generateImagesLinks(
    //   `کاور آلبوم آهنگ با موضوع ${createAutoPlaylistDto.prompts.join('، ')}`,
    // );
    // console.log(generatedImages);
  }
}
