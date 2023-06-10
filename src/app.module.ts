import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MusicModule } from './music/music.module';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { SeederModule } from './seeder/seeder.module';
import { MoodModule } from './mood/mood.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_DB_URL ?? 'mongodb://localhost/dmp',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MusicModule,
    ArtistModule,
    UserModule,
    SeederModule,
    MoodModule,
    AuthModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
