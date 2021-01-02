import { Injectable } from '@nestjs/common';
import { PlantPredictionCreateDto, PlantPredictionDto } from '../dtos';
import { PlantPredictionForCreation } from '../interfaces';
import { PlantPredictionsRepository } from '../repositories';
import { PlantPredictions } from '../schemas';

@Injectable()
export class PlantPredictionsService {
  constructor(private plantPredictionsRepository: PlantPredictionsRepository) {}

  async createPlantPrediction(
    userId: string,
    plantPredictionCreateDto: PlantPredictionCreateDto,
    plantPhoto: Express.Multer.File,
  ): Promise<PlantPredictionDto> {
    const plantPredictionForCreation: PlantPredictionForCreation = {
      photoPath: plantPhoto.filename,
      predictedPlantName: plantPredictionCreateDto.predictedPlantName,
    };
    let createdPlantPrediction: PlantPredictions;
    createdPlantPrediction = await this.plantPredictionsRepository.createPlantPrediction(
      userId,
      plantPredictionForCreation,
    );
    if (!createdPlantPrediction) {
      createdPlantPrediction = await this.plantPredictionsRepository.createPlantPredictions(
        userId,
        plantPredictionForCreation,
      );
    }
    const {
      _id,
      photoPath,
      predictedPlantName,
      timestamp,
    } = createdPlantPrediction.predictions.pop();
    const plantPredictionDto: PlantPredictionDto = {
      _id,
      photoPath,
      predictedPlantName,
      timestamp,
    };
    return plantPredictionDto;
  }

  async getPlantPredictions(id: string): Promise<PlantPredictions> {
    return await this.plantPredictionsRepository.getPlantPredictions(id);
  }
}
