import {
  Body,
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
import { FileFieldRequiredException } from 'exceptions';
import { PlantPredictionCreateDto } from '../dtos';

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
    @Body() plantPredictionCreateDto: PlantPredictionCreateDto,
    @UploadedFile() plantPhoto: Express.Multer.File,
  ): Promise<any> {
    if (!plantPhoto) {
      throw new FileFieldRequiredException('plantPhoto');
    }
    return this.plantPredictionsService.createPlantPrediction(
      userId,
      plantPredictionCreateDto,
      plantPhoto,
    );
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

  @Get('photos/:photoPath')
  async getPlantPhoto(
    @Param('photoPath') photoPath: string,
    @Res() res: Response,
  ) {
    return res.sendFile(photoPath, { root: './media' });
  }
}
