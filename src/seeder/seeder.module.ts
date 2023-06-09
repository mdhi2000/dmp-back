import { Module } from '@nestjs/common';
// import { SeedCommand } from './seed';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from 'src/artist/schemas/artist.schema';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
  ],
  controllers: [SeederController],
  providers: [SeederService],
  // providers: [SeedCommand],
})
export class SeederModule {}
