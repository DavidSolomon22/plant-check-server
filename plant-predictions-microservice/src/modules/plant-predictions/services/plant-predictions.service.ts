import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getUserPlantPredictions(userId: string): Promise<PlantPredictions> {
    const userPlantPredictions = await this.plantPredictionsRepository.getUserPlantPredictions(
      userId,
    );
    if (userPlantPredictions) {
      return userPlantPredictions;
    } else {
      throw new NotFoundException();
    }
  }

  async getUserSinglePlantPrediction(
    userId: string,
    plantPredictionId: string,
  ): Promise<PlantPredictionDto> {
    const userSinglePlantPrediction = await this.plantPredictionsRepository.getUserSinglePlantPrediction(
      userId,
      plantPredictionId,
    );
    if (userSinglePlantPrediction?.predictions?.length === 1) {
      const {
        _id,
        photoPath,
        predictedPlantName,
        timestamp,
      } = userSinglePlantPrediction.predictions[0];
      const plantPredictionDto: PlantPredictionDto = {
        _id,
        photoPath,
        predictedPlantName,
        timestamp,
      };
      return plantPredictionDto;
    } else {
      throw new NotFoundException();
    }
  }
}
