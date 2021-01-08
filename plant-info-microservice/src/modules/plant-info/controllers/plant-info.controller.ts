import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlantInfoCreateDto } from '../dtos';
import { PlantInfoService } from '../services';

@Controller()
export class PlantInfoController {
  constructor(private plantInfoService: PlantInfoService) {}

  @Post('plants-info')
  async createPlantInfo(
    @Body() plantInfoCreateDto: PlantInfoCreateDto,
  ): Promise<any> {
    return this.plantInfoService.createPlantInfo(plantInfoCreateDto);
  }

  @Get('plants-info/:plantName/overview')
  async getPlantOverview(@Param('plantName') plantName: string): Promise<any> {
    return this.plantInfoService.getPlantOverview(plantName);
  }

  // @Get('plants-info/:plantName/details')
  // async getPlantDetails(@Param('plantName') plantName: string): Promise<any> {
  //   console.log('plantName :>> ', plantName);
  //   return 'getPlantDetails';
  // }
}
