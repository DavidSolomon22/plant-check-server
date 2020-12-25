import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlantPredictionsService } from '../services';

@Controller('plant-predictions')
export class PlantPredictionsController {
  constructor(private plantPredictionsService: PlantPredictionsService) {}

  @Post()
  async createPlantPredictions(@Body() plantPredictions: any): Promise<any> {
    return await this.plantPredictionsService.createPlantPredictions(
      plantPredictions,
    );
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('plantPhoto'))
  async createPlantPrediction(@UploadedFile() plantPhoto): Promise<any> {
    console.log(plantPhoto);
    return await null;
  }

  @Get(':id')
  async getPlantPredictions(@Param('id') id: string): Promise<any> {
    return this.plantPredictionsService.getPlantPredictions(id);
  }
}
