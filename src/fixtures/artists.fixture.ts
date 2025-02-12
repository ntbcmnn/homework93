import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';

@Injectable()
export class ArtistFixtureService implements OnModuleInit {
  constructor(
    @InjectModel(Artist.name)
    private artistModel: Model<ArtistDocument>,
  ) {}

  async onModuleInit() {
    const existingArtists = await this.artistModel.find();

    if (existingArtists.length === 0) {
      await this.artistModel.insertMany([
        {
          name: 'Skryptonite',
          info: 'Kazakh singer and musical producer, founder of the Musica36 label.',
          image: '/uploads/artists/skryptonite.jpg',
        },
        {
          name: 'Noize MC',
          info: 'Russian rap-rock-artist, songwriter and musician.',
          image: '/uploads/artists/noize_mc.jpeg',
        },
        {
          name: 'Monetochka',
          info: 'Russian singer, songwriter and musician.',
          image: '/uploads/artists/monetochka.jpg',
        },
      ]);
      console.log('Artists fixture loaded.');
    }
  }
}
