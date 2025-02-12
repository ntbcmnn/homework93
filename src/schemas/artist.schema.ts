import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  image: string;

  @Prop({ default: null })
  info: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
