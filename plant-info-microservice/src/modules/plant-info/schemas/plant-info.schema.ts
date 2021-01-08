import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  versionKey: false,
})
export class PlantOverview extends Document {
  @Prop({
    type: String,
    required: true,
  })
  sun: string;

  @Prop({
    type: String,
    required: true,
  })
  water: string;

  @Prop({
    type: String,
    required: true,
  })
  potSize: string;

  @Prop({
    type: String,
    required: true,
  })
  fertalizer: string;
}
const PlantOverviewSchema = SchemaFactory.createForClass(PlantOverview);

@Schema({
  versionKey: false,
})
export class PlantDetails extends Document {
  @Prop({
    type: String,
    required: true,
  })
  sun: string;

  @Prop({
    type: String,
    required: true,
  })
  water: string;

  @Prop({
    type: String,
    required: true,
  })
  potSize: string;

  @Prop({
    type: String,
    required: true,
  })
  fertalizer: string;

  @Prop({
    type: [String],
    required: true,
  })
  photoPaths: string[];
}
const PlantDetailsSchema = SchemaFactory.createForClass(PlantDetails);

@Schema({
  versionKey: false,
})
export class PlantInfo extends Document {
  @Prop({
    type: String,
    required: true,
  })
  plantName: string;

  @Prop({
    type: PlantOverviewSchema,
    required: true,
  })
  plantOverview: PlantOverview;

  @Prop({
    type: PlantDetailsSchema,
    required: false,
  })
  plantDetails: PlantDetails;
}
export const PlantInfoSchema = SchemaFactory.createForClass(PlantInfo);
