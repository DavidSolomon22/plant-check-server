import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlantInfo } from '../schemas';

@Injectable()
export class PlantInfoRepository {
  constructor(
    @InjectModel(PlantInfo.name)
    private plantInfoModel: Model<PlantInfo>,
  ) {}

  async createPlantInfo(plantInfo: any): Promise<PlantInfo> {
    return this.plantInfoModel.create(plantInfo);
  }

  async getPlantOverviewInfo(plantName: string): Promise<PlantInfo> {
    return this.plantInfoModel
      .findOne({ plantName: plantName })
      .select('plantOverview');
  }

  async getPlantDetailInfo(plantName: string): Promise<PlantInfo> {
    return this.plantInfoModel
      .findOne({ plantName: plantName })
      .select('plantDetails');
  }

  async addPhotoPathToPlantDetails(
    plantName: string,
    photoPath: string,
  ): Promise<PlantInfo> {
    return this.plantInfoModel.findOneAndUpdate(
      { plantName: plantName },
      { $push: { 'plantDetails.photoPaths': photoPath } },
      { new: true, runValidators: true, context: 'query' },
    );
  }
}
