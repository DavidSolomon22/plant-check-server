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

@Controller()
export class PlantPredictionsController {
  constructor(private plantPredictionsService: PlantPredictionsService) {}

  @Post('users/:userId/plants-predictions')
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
    if (!plantPhoto) {
      console.log('throw error, that plantPhoto is required');
    }
    return null;
  }

  @Get('users/:userId/plants-predictions')
  async getPlantPredictions(
    @Param('userId') userId: string,
  ): Promise<PlantPredictions> {
    return this.plantPredictionsService.getPlantPredictions(userId);
  }

  @Get('users/:userId/plants-predictions/:plantPredictionId')
  async getPlantPrediction(
    @Param('userId') userId: string,
    @Param('plantPredictionId') plantPredictionId: string,
  ): Promise<string> {
    return 'getPlantPrediction';
    // return this.plantPredictionsService.getPlantPredictions(userId);
  }

  @Get('images/:imagePath')
  async getPlantPhoto(
    @Param('imagePath') imagePath: string,
    @Res() res: Response,
  ) {
    return res.sendFile(imagePath, { root: './media' });
  }
}
