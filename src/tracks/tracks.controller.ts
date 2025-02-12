import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from '../schemas/track.schema';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { CreateTrackDto } from './create-track.dto';
import { Artist, ArtistDocument } from '../schemas/artist.schema';

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Track.name)
    private trackModel: Model<TrackDocument>,
    @InjectModel(Album.name)
    private albumModel: Model<AlbumDocument>,
    @InjectModel(Artist.name)
    private artistModel: Model<ArtistDocument>,
  ) {}

  @Get()
  async getAll(@Query('album') album?: string) {
    if (album) {
      const tracks = await this.trackModel.find({ album: album });

      if (tracks.length === 0) {
        throw new BadRequestException('No tracks found for this album');
      }

      return tracks;
    }
    return this.trackModel.find();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const track = await this.trackModel.findById(id);
    if (!track) throw new NotFoundException('Track not found');

    return track;
  }

  @Post()
  async create(@Body() trackDto: CreateTrackDto) {
    const artist = await this.artistModel.findById(trackDto.artist);
    if (!artist) throw new NotFoundException('Artist not found');

    const album = await this.albumModel.findById(trackDto.album);
    if (!album) throw new NotFoundException('Album not found');

    const track = new this.trackModel({
      artist: trackDto.artist,
      album: trackDto.album,
      name: trackDto.name,
      duration: trackDto.duration,
      track_number: trackDto.track_number,
    });

    return await track.save();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const track = await this.trackModel.findById(id);
    if (!track) throw new NotFoundException('Track not found');

    await this.trackModel.findByIdAndDelete(id);

    return { message: 'Track successfully deleted' };
  }
}
