import { Injectable, NotFoundException } from '@nestjs/common';
import { ArrayLengthLimitException } from 'exceptions';
import { PlantInfoRepository } from '../repositories';
import { PlantDetails, PlantInfo, PlantOverview } from '../schemas';

@Injectable()
export class PlantInfoService {
  constructor(private plantInfoRepository: PlantInfoRepository) {}

  async createPlantInfo(plantInfo: any): Promise<PlantInfo> {
    return this.plantInfoRepository.createPlantInfo(plantInfo);
  }

  async getPlantOverviewInfo(plantName: string): Promise<PlantOverview> {
    const plantInfo = await this.plantInfoRepository.getPlantOverviewInfo(
      plantName,
    );
    if (plantInfo?.plantOverview) {
      return plantInfo.plantOverview;
    } else {
      throw new NotFoundException();
    }
  }

  async getPlantDetailInfo(plantName: string): Promise<PlantDetails> {
    const plantInfo = await this.plantInfoRepository.getPlantDetailInfo(
      plantName,
    );
    if (plantInfo?.plantDetails) {
      return plantInfo.plantDetails;
    } else {
      throw new NotFoundException();
    }
  }

  async uploadPhotoForPlantDetails(
    plantName: string,
    plantPhoto: Express.Multer.File,
  ): Promise<PlantInfo> {
    const plantDetails = await this.getPlantDetailInfo(plantName);
    if (plantDetails.photoPaths.length >= 4) {
      throw new ArrayLengthLimitException('photoPaths', 4);
    } else {
      return this.plantInfoRepository.addPhotoPathToPlantDetails(
        plantName,
        plantPhoto.filename,
      );
    }
  }
}
