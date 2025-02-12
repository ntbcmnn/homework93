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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './create-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Artist, ArtistDocument } from '../schemas/artist.schema';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name)
    private albumModel: Model<AlbumDocument>,
    @InjectModel(Artist.name)
    private artistModel: Model<ArtistDocument>,
  ) {}

  @Get()
  async getAll(@Query('artist') artist?: string) {
    if (artist) {
      const albums = await this.albumModel.find({ artist: artist });

      if (albums.length === 0) {
        throw new BadRequestException('No albums found for this artist');
      }

      return albums;
    }

    return this.albumModel.find();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const album = await this.albumModel.findById(id);
    if (!album) throw new NotFoundException('Album not found');

    return album;
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/albums' }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() albumDto: CreateAlbumDto,
  ) {
    const artist = await this.artistModel.findById(albumDto.artist);
    if (!artist) throw new NotFoundException('Artist not found');

    const album = new this.albumModel({
      artist: albumDto.artist,
      name: albumDto.name,
      release_year: albumDto.release_year,
      image: file && file.filename ? '/uploads/albums/' + file.filename : null,
    });

    return await album.save();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const album = await this.albumModel.findById(id);
    if (!album) throw new NotFoundException('Album not found');

    await this.albumModel.findByIdAndDelete(id);

    return { message: 'Album successfully deleted' };
  }
}
