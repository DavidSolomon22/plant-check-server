import { Injectable, NotFoundException } from '@nestjs/common';
import { PlantInfoRepository } from '../repositories';

@Injectable()
export class PlantInfoService {
  constructor(private plantInfoRepository: PlantInfoRepository) {}

  async createPlantInfo(plantInfo: any): Promise<any> {
    return this.plantInfoRepository.createPlantInfo(plantInfo);
  }

  async getPlantOverviewInfo(plantName: string): Promise<any> {
    const plantInfo = await this.plantInfoRepository.getPlantOverviewInfo(
      plantName,
    );
    if (plantInfo?.plantOverview) {
      return plantInfo.plantOverview;
    } else {
      throw new NotFoundException();
    }
  }

  async getPlantDetailInfo(plantName: string): Promise<any> {
    const plantInfo = await this.plantInfoRepository.getPlantDetailInfo(
      plantName,
    );
    if (plantInfo?.plantDetails) {
      return plantInfo.plantDetails;
    } else {
      throw new NotFoundException();
    }
  }
}
