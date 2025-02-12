import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Artist } from './artist.schema';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
  })
  artist: Artist;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  release_year: number;

  @Prop({ default: null })
  image: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
