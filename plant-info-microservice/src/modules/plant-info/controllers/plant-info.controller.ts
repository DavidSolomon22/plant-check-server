import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlantInfoCreateDto } from '../dtos';
import { PlantInfoService } from '../services';

@Controller()
export class PlantInfoController {
  constructor(private plantInfoService: PlantInfoService) {}

  @Post('plant-infos')
  async createPlantInfo(
    @Body() plantInfoCreateDto: PlantInfoCreateDto,
  ): Promise<void> {
    await this.plantInfoService.createPlantInfo(plantInfoCreateDto);
  }

  @Get('plant-infos/:plantName/overview')
  async getPlantOverviewInfo(
    @Param('plantName') plantName: string,
  ): Promise<any> {
    return this.plantInfoService.getPlantOverviewInfo(plantName);
  }

  @Get('plant-infos/:plantName/details')
  async getPlantDetailInfo(
    @Param('plantName') plantName: string,
  ): Promise<any> {
    return this.plantInfoService.getPlantDetailInfo(plantName);
  }
}
