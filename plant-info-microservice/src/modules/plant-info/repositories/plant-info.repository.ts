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

  async createPlantInfo(plantInfo: any): Promise<any> {
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
}
