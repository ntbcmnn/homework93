import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Artist } from './artist.schema';
import { Album } from './album.schema';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
  })
  artist: Artist;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
  })
  album: Album;

  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  duration: string;

  @Prop({ required: true })
  track_number: number;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
