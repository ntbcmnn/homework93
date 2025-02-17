import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Track, TrackDocument } from '../schemas/track.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { randomUUID } from 'node:crypto';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Artist.name)
    private artistModel: Model<ArtistDocument>,
    @InjectModel(Album.name)
    private albumModel: Model<AlbumDocument>,
    @InjectModel(Track.name)
    private trackModel: Model<TrackDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async seed() {
    console.log('Creating fixtures started...');

    await this.artistModel.deleteMany({});
    await this.albumModel.deleteMany({});
    await this.trackModel.deleteMany({});
    await this.userModel.deleteMany({});

    console.log('Successfully cleared collections');

    const [jane, john] = await this.userModel.create(
      {
        email: 'jane',
        password: '123',
        role: 'admin',
        displayName: 'Jane Smith',
        token: randomUUID(),
      },
      {
        email: 'john',
        password: '123',
        role: 'user',
        displayName: 'John Doe',
        token: randomUUID(),
      },
    );

    const [skryptonite, monetochka, noize_mc, zoloto] =
      await this.artistModel.create(
        {
          user: jane._id,
          name: 'Skryptonite',
          info: 'Kazakh singer and musical producer, founder of the Musica36 label.',
          image: 'fixtures/skryptonite.jpg',
        },
        {
          user: john._id,
          name: 'Monetochka',
          info: 'Russian singer, songwriter and musician.',
          image: 'fixtures/monetochka.jpg',
        },
        {
          user: jane._id,
          name: 'Noize MC',
          info: 'Russian rap-rock-artist, songwriter and musician.',
          image: 'fixtures/noize_mc.jpeg',
        },
        {
          user: john._id,
          name: 'ZOLOTO',
          info: 'Musician, author & artist, rock & pop-singer from Kazakhstan.',
          image: 'fixtures/zoloto.jpg',
        },
      );

    const [
      yeahh_pt1,
      uroboros,
      coloring_books,
      prayers,
      new_album,
      last_album,
      reincarnate,
    ] = await this.albumModel.create(
      {
        name: 'Yeahh PT. 1',
        user: jane._id,
        artist: skryptonite._id,
        release_year: 2023,
        image: 'fixtures/yeahh.png',
      },
      {
        name: 'Uroboros: Street 36',
        user: jane._id,
        artist: skryptonite._id,
        release_year: 2017,
        image: 'fixtures/uroboros.jpg',
      },
      {
        name: 'Coloring books for adults',
        user: jane._id,
        artist: monetochka._id,
        release_year: 2018,
        image: 'fixtures/coloring_books.jpg',
      },
      {
        name: 'Prayers. Anecdotes. Toasts.',
        user: john._id,
        artist: monetochka._id,
        release_year: 2024,
        image: 'fixtures/prayers.jpeg',
      },
      {
        name: 'New album',
        user: john._id,
        artist: noize_mc._id,
        release_year: 2012,
        image: 'fixtures/new_album.jpg',
      },
      {
        name: 'Last album',
        user: john._id,
        artist: noize_mc._id,
        release_year: 2010,
        image: 'fixtures/last_album.jpg',
      },
      {
        name: 'Reincarnate',
        user: john._id,
        artist: zoloto._id,
        release_year: 2024,
        image: 'fixtures/reincarnate.png',
      },
    );

    await this.trackModel.create(
      {
        name: 'Asta la vista',
        user: john._id,
        artist: skryptonite._id,
        album: yeahh_pt1._id,
        duration: '3:32',
        track_number: 1,
      },
      {
        name: 'Something better than',
        user: john._id,
        artist: skryptonite._id,
        album: yeahh_pt1._id,
        duration: '3:54',
        track_number: 2,
      },
      {
        name: 'Rings',
        user: john._id,
        artist: skryptonite._id,
        album: yeahh_pt1._id,
        duration: '3:34',
        track_number: 3,
      },
      {
        name: 'Names',
        user: john._id,
        artist: skryptonite._id,
        album: yeahh_pt1._id,
        duration: '2:32',
        track_number: 4,
      },
      {
        name: 'To the ground',
        user: john._id,
        artist: skryptonite._id,
        album: yeahh_pt1._id,
        duration: '4:04',
        track_number: 5,
      },
      {
        name: 'Mister 718',
        user: john._id,
        artist: skryptonite._id,
        album: uroboros._id,
        duration: '3:46',
        track_number: 1,
      },
      {
        name: 'Waste of time',
        user: john._id,
        artist: skryptonite._id,
        album: uroboros._id,
        duration: '3:37',
        track_number: 2,
      },
      {
        name: 'Butter',
        user: john._id,
        artist: skryptonite._id,
        album: uroboros._id,
        duration: '4:16',
        track_number: 3,
      },
      {
        name: 'Boy',
        user: john._id,
        artist: skryptonite._id,
        album: uroboros._id,
        duration: '2:57',
        track_number: 4,
      },
      {
        name: 'Animals',
        user: john._id,
        artist: skryptonite._id,
        album: uroboros._id,
        duration: '3:02',
        track_number: 5,
      },
      {
        name: 'Every time',
        user: john._id,
        artist: monetochka._id,
        album: coloring_books._id,
        duration: '3:28',
        track_number: 1,
      },
      {
        name: 'No coins',
        user: jane._id,
        artist: monetochka._id,
        album: coloring_books._id,
        duration: '4:38',
        track_number: 2,
      },
      {
        name: '90',
        user: jane._id,
        artist: monetochka._id,
        album: coloring_books._id,
        duration: '3:21',
        track_number: 3,
      },
      {
        name: 'Your name',
        user: jane._id,
        artist: monetochka._id,
        album: coloring_books._id,
        duration: '3:01',
        track_number: 4,
      },
      {
        name: 'Night stall',
        user: jane._id,
        artist: monetochka._id,
        album: coloring_books._id,
        duration: '2:44',
        track_number: 5,
      },
      {
        name: 'It was in Russia',
        user: jane._id,
        artist: monetochka._id,
        album: prayers._id,
        duration: '3:13',
        track_number: 1,
      },
      {
        name: 'Again',
        user: jane._id,
        artist: monetochka._id,
        album: prayers._id,
        duration: '2:46',
        track_number: 2,
      },
      {
        name: 'Monopoly',
        user: jane._id,
        artist: monetochka._id,
        album: prayers._id,
        duration: '3:37',
        track_number: 3,
      },
      {
        name: 'Selfharm',
        user: jane._id,
        artist: monetochka._id,
        album: prayers._id,
        duration: '3:08',
        track_number: 4,
      },
      {
        name: 'Over the rooftops',
        user: jane._id,
        artist: monetochka._id,
        album: prayers._id,
        duration: '3:28',
        track_number: 5,
      },
      {
        name: 'Egoism',
        user: jane._id,
        artist: noize_mc._id,
        album: new_album._id,
        duration: '2:44',
        track_number: 1,
      },
      {
        name: 'Is universe infinite?',
        user: jane._id,
        artist: noize_mc._id,
        album: new_album._id,
        duration: '4:20',
        track_number: 2,
      },
      {
        name: `I'm dumb`,
        user: jane._id,
        artist: noize_mc._id,
        album: new_album._id,
        duration: '3:50',
        track_number: 3,
      },
      {
        name: 'Yes future!',
        user: jane._id,
        artist: noize_mc._id,
        album: new_album._id,
        duration: '3:09',
        track_number: 4,
      },
      {
        name: 'Swimming pool',
        user: jane._id,
        artist: noize_mc._id,
        album: new_album._id,
        duration: '3:36',
        track_number: 5,
      },
      {
        name: 'Wreak havoc',
        user: jane._id,
        artist: noize_mc._id,
        album: last_album._id,
        duration: '3:59',
        track_number: 1,
      },
      {
        name: 'The singer and the actress',
        user: jane._id,
        artist: noize_mc._id,
        album: last_album._id,
        duration: '4:23',
        track_number: 2,
      },
      {
        name: 'Backton #1',
        user: jane._id,
        artist: noize_mc._id,
        album: last_album._id,
        duration: '3:35',
        track_number: 3,
      },
      {
        name: 'Empty spaces',
        user: jane._id,
        artist: noize_mc._id,
        album: last_album._id,
        duration: '4:17',
        track_number: 4,
      },
      {
        name: 'Antennas',
        user: jane._id,
        artist: noize_mc._id,
        album: last_album._id,
        duration: '3:53',
        track_number: 5,
      },
      {
        name: `Didn't happen`,
        user: john._id,
        artist: zoloto._id,
        album: reincarnate._id,
        duration: '2:28',
        track_number: 1,
      },
      {
        name: `I'll be alone`,
        user: john._id,
        artist: zoloto._id,
        album: reincarnate._id,
        duration: '3:10',
        track_number: 2,
      },
      {
        name: `It's about to be April`,
        user: john._id,
        artist: zoloto._id,
        album: reincarnate._id,
        duration: '3:04',
        track_number: 3,
      },
    );
  }
}
