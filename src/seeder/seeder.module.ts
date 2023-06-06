import { Module } from '@nestjs/common';
// import { SeedCommand } from './seed';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from 'src/artist/schemas/artist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
  ],
  // providers: [SeedCommand],
})
export class SeederModule {}
