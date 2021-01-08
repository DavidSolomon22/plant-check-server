import { Injectable, NotFoundException } from '@nestjs/common';
import { PlantInfoRepository } from '../repositories';

@Injectable()
export class PlantInfoService {
  constructor(private plantInfoRepository: PlantInfoRepository) {}

  async createPlantInfo(plantInfo: any): Promise<any> {
    return this.plantInfoRepository.createPlantInfo(plantInfo);
  }

  async getPlantOverview(plantName: string): Promise<any> {
    const plantOverview = await this.plantInfoRepository.getPlantOverview(
      plantName,
    );
    if (plantOverview?.plantOverview) {
      return plantOverview.plantOverview;
    } else {
      throw new NotFoundException();
    }
  }
}
