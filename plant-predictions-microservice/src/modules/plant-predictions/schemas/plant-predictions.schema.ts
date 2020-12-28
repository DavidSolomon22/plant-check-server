import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PlantPredictions extends Document {
  @Prop({
    required: true,
  })
  docs: string;
}

export const PlantPredictionsSchema = SchemaFactory.createForClass(
  PlantPredictions,
);
