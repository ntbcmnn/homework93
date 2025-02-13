import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Track, TrackDocument } from '../schemas/track.schema';
import { AlbumFixtureService } from './albums.fixture';

@Injectable()
export class TrackFixtureService implements OnModuleInit {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    private albumFixtureService: AlbumFixtureService,
  ) {}

  async onModuleInit() {
    await this.trackModel.deleteMany({});

    await this.albumFixtureService.onModuleInit();

    const existingTracks = await this.trackModel.find();

    if (existingTracks.length === 0) {
      const skryptonite = await this.artistModel.findOne({
        name: 'Skryptonite',
      });
      const noizeMC = await this.artistModel.findOne({ name: 'Noize MC' });
      const monetochka = await this.artistModel.findOne({ name: 'Monetochka' });

      if (!skryptonite || !noizeMC || !monetochka) {
        console.warn('Artists not found, skipping album fixture.');
        return;
      }

      const uroboros = await this.albumModel.findOne({
        name: 'Uroboros: Street 36',
      });
      const yeah = await this.albumModel.findOne({ name: 'Yeahh PT. 1' });
      const last_album = await this.albumModel.findOne({ name: 'Last album' });
      const new_album = await this.albumModel.findOne({ name: 'New album' });
      const coloring_books = await this.albumModel.findOne({
        name: 'Coloring books for adults',
      });
      const prayers = await this.albumModel.findOne({
        name: 'Prayers. Anecdotes. Toasts.',
      });

      if (
        !uroboros ||
        !yeah ||
        !last_album ||
        !new_album ||
        !coloring_books ||
        !prayers
      ) {
        console.warn('Albums not found, skipping track fixture.');
        return;
      }

      await this.trackModel.insertMany([
        {
          artist: skryptonite._id,
          album: yeah._id,
          name: 'Asta la vista',
          duration: '3:32',
          track_number: 1,
        },
        {
          artist: skryptonite._id,
          album: yeah._id,
          name: 'Something better than',
          duration: '3:54',
          track_number: 2,
        },
        {
          artist: skryptonite._id,
          album: yeah._id,
          name: 'Rings',
          duration: '3:34',
          track_number: 3,
        },
        {
          artist: skryptonite._id,
          album: uroboros._id,
          name: 'Mister 718',
          duration: '3:46',
          track_number: 1,
        },
        {
          artist: skryptonite._id,
          album: uroboros._id,
          name: 'Waste of time',
          duration: '3:37',
          track_number: 2,
        },
        {
          artist: skryptonite._id,
          album: uroboros._id,
          name: 'Butter',
          duration: '2:57',
          track_number: 3,
        },
        {
          name: 'Wreak havoc',
          artist: noizeMC._id,
          album: last_album._id,
          duration: '3:59',
          track_number: 1,
        },
        {
          name: 'The singer and the actress',
          artist: noizeMC._id,
          album: last_album._id,
          duration: '4:23',
          track_number: 2,
        },
        {
          name: 'Backton #1',
          artist: noizeMC._id,
          album: last_album._id,
          duration: '3:35',
          track_number: 3,
        },
        {
          name: 'Swimming pool',
          artist: noizeMC._id,
          album: new_album._id,
          duration: '3:36',
          track_number: 1,
        },
        {
          name: 'Yes future!',
          artist: noizeMC._id,
          album: new_album._id,
          duration: '3:09',
          track_number: 2,
        },
        {
          name: `I'm dumb`,
          artist: noizeMC._id,
          album: new_album._id,
          duration: '3:50',
          track_number: 3,
        },
        {
          name: '90',
          artist: monetochka._id,
          album: coloring_books._id,
          duration: '3:21',
          track_number: 1,
        },
        {
          name: 'Your name',
          artist: monetochka._id,
          album: coloring_books._id,
          duration: '3:01',
          track_number: 2,
        },
        {
          name: 'Night stall',
          artist: monetochka._id,
          album: coloring_books._id,
          duration: '2:44',
          track_number: 3,
        },
        {
          name: 'It was in Russia',
          artist: monetochka._id,
          album: prayers._id,
          duration: '3:13',
          track_number: 1,
        },
        {
          name: 'Again',
          artist: monetochka._id,
          album: prayers._id,
          duration: '2:46',
          track_number: 2,
        },
        {
          name: 'Monopoly',
          artist: monetochka._id,
          album: prayers._id,
          duration: '3:37',
          track_number: 3,
        },
      ]);
      console.log('Tracks fixture loaded.');
    }
  }
}
