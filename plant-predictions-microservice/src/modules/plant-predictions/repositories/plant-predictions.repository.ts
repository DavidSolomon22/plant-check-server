import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlantPredictionForCreation } from '../interfaces';
import { PlantPredictions } from '../schemas';

@Injectable()
export class PlantPredictionsRepository {
  constructor(
    @InjectModel(PlantPredictions.name)
    private plantPredictionsModel: Model<PlantPredictions>,
  ) {}

  async createPlantPrediction(
    userId: string,
    plantPredictionForCreation: PlantPredictionForCreation,
  ): Promise<PlantPredictions> {
    return this.plantPredictionsModel
      .findOneAndUpdate(
        { userId: userId },
        { $push: { predictions: plantPredictionForCreation as any } },
        { new: true, runValidators: true, context: 'query' },
      )
      .slice('predictions', -1);
  }

  async createPlantPredictions(
    userId: string,
    plantPredictionForCreation: PlantPredictionForCreation,
  ): Promise<PlantPredictions> {
    return this.plantPredictionsModel.create({
      userId: userId,
      predictions: [plantPredictionForCreation] as any,
    });
  }

  async getUserPlantPredictions(userId: string): Promise<PlantPredictions> {
    return this.plantPredictionsModel.findOne({ userId: userId });
  }

  async getUserSinglePlantPrediction(
    userId: string,
    plantPredictionId: string,
  ): Promise<PlantPredictions> {
    return this.plantPredictionsModel
      .findOne(
        {
          userId: userId,
          'predictions._id': plantPredictionId,
        },
        {
          'predictions.$': 1,
        },
      )
      .select('predictions -_id');
  }
}
