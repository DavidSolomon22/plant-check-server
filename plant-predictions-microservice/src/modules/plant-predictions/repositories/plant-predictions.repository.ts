import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlantPredictions } from '../schemas';

@Injectable()
export class PlantPredictionsRepository {
  constructor(
    @InjectModel(PlantPredictions.name)
    private plantPredictionsModel: Model<PlantPredictions>,
  ) {}

  async createPlantPredictions(
    plantPredictions: any,
  ): Promise<PlantPredictions> {
    return this.plantPredictionsModel.create(plantPredictions);
  }

  async getPlantPredictions(id: string): Promise<PlantPredictions> {
    return this.plantPredictionsModel.findById(id);
  }
}
