import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { ArtistFixtureService } from './artists.fixture';

@Injectable()
export class AlbumFixtureService implements OnModuleInit {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    private artistFixtureService: ArtistFixtureService,
  ) {}

  async onModuleInit() {
    await this.artistFixtureService.onModuleInit();

    await this.albumModel.deleteMany({});

    const existingAlbums = await this.albumModel.find();

    if (existingAlbums.length === 0) {
      const skryptonite = await this.artistModel.findOne({
        name: 'Skryptonite',
      });
      const noizeMC = await this.artistModel.findOne({ name: 'Noize MC' });
      const monetochka = await this.artistModel.findOne({ name: 'Monetochka' });

      if (!skryptonite || !noizeMC || !monetochka) {
        console.warn('Artists not found, skipping album fixture.');
        return;
      }

      await this.albumModel.insertMany([
        {
          artist: skryptonite._id,
          name: 'Yeahh PT. 1',
          release_year: 2024,
          image: '/fixtures/albums/yeahh.png',
        },
        {
          artist: skryptonite._id,
          name: 'Uroboros: Street 36',
          release_year: 2017,
          image: '/fixtures/albums/uroboros.jpg',
        },
        {
          artist: noizeMC._id,
          name: 'Last album',
          release_year: 2010,
          image: '/fixtures/albums/last_album.jpg',
        },
        {
          artist: noizeMC._id,
          name: 'New album',
          release_year: 2012,
          image: '/fixtures/albums/new_album.jpg',
        },
        {
          artist: monetochka._id,
          name: 'Coloring books for adults',
          release_year: 2018,
          image: '/fixtures/albums/coloring_books.jpg',
        },
        {
          artist: monetochka._id,
          name: 'Prayers. Anecdotes. Toasts.',
          release_year: 2024,
          image: '/fixtures/albums/prayers.jpeg',
        },
      ]);
      console.log('Albums fixture loaded.');
    }
  }
}
