import { Injectable } from '@nestjs/common';
import { PlantPredictionsRepository } from '../repositories';
import { PlantPredictions } from '../schemas';

@Injectable()
export class PlantPredictionsService {
  constructor(private plantPredictionsRepository: PlantPredictionsRepository) {}

  async createPlantPredictions(
    plantPredictions: any,
  ): Promise<PlantPredictions> {
    return await this.plantPredictionsRepository.createPlantPredictions(
      plantPredictions,
    );
  }

  async getPlantPredictions(id: string): Promise<PlantPredictions> {
    return await this.plantPredictionsRepository.getPlantPredictions(id);
  }
}
