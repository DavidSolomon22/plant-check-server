import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  versionKey: false,
})
class PlantPrediction extends Document {
  @Prop({
    type: String,
    required: true,
  })
  predictedPlantName: string;

  @Prop({
    type: String,
    required: true,
  })
  photoPath: string;

  @Prop({
    type: Date,
    required: true,
    default: () => Date.now(),
  })
  timestamp: Date;
}

const PlantPredictionSchema = SchemaFactory.createForClass(PlantPrediction);

@Schema({
  versionKey: false,
})
export class PlantPredictions extends Document {
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({
    type: [PlantPredictionSchema],
    required: true,
    default: [],
  })
  predictions: PlantPrediction[];
}

export const PlantPredictionsSchema = SchemaFactory.createForClass(
  PlantPredictions,
);
