import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlantPredictionsService } from '../services';
import { Express, Response } from 'express';
import { PlantPredictions } from '../schemas';
import { MulterUtilsService } from 'utils/services';

@Controller('plant-predictions')
export class PlantPredictionsController {
  constructor(private plantPredictionsService: PlantPredictionsService) {}

  @Post(':userId')
  @UseInterceptors(
    FileInterceptor('plantPhoto', {
      storage: MulterUtilsService.plantPhotoDiskStorage(),
      fileFilter: MulterUtilsService.plantPhotoFileFilter,
    }),
  )
  async createPlantPrediction(
    @Param('userId') userId: string,
    @UploadedFile() plantPhoto: Express.Multer.File,
  ): Promise<PlantPredictions> {
    console.log(plantPhoto);
    return null;
  }

  @Get(':userId')
  async getPlantPredictions(
    @Param('userId') userId: string,
  ): Promise<PlantPredictions> {
    return this.plantPredictionsService.getPlantPredictions(userId);
  }

  @Get('images/:imagePath')
  async getPlantPhoto(
    @Param('imagePath') imagePath: string,
    @Res() res: Response,
  ) {
    return res.sendFile(imagePath, { root: './media' });
  }
}
