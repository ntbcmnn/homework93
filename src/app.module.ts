import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './artists/artists.controller';
import { TracksController } from './tracks/tracks.controller';
import { AlbumsController } from './albums/albums.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './schemas/artist.schema';
import { Album, AlbumSchema } from './schemas/album.schema';
import { Track, TrackSchema } from './schemas/track.schema';
import { ArtistFixtureService } from './fixtures/artists.fixture';
import { AlbumFixtureService } from './fixtures/albums.fixture';
import { TrackFixtureService } from './fixtures/tracks.fixture';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/spotify'),
    MongooseModule.forFeature([
      { name: Artist.name, schema: ArtistSchema },
      { name: Album.name, schema: AlbumSchema },
      { name: Track.name, schema: TrackSchema },
    ]),
  ],
  controllers: [
    AppController,
    ArtistsController,
    TracksController,
    AlbumsController,
  ],
  providers: [
    AppService,
    ArtistFixtureService,
    AlbumFixtureService,
    TrackFixtureService,
  ],
})
export class AppModule {}
