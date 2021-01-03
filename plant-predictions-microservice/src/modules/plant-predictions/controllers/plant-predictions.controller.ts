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
import { PlantPredictionCreateDto, PlantPredictionDto } from '../dtos';

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
  ): Promise<PlantPredictionDto> {
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
  async getUserPlantPredictions(
    @Param('userId') userId: string,
  ): Promise<PlantPredictions> {
    return this.plantPredictionsService.getUserPlantPredictions(userId);
  }

  @Get('users/:userId/plants-predictions/:plantPredictionId')
  async getUserSinglePlantPrediction(
    @Param('userId') userId: string,
    @Param('plantPredictionId') plantPredictionId: string,
  ): Promise<PlantPredictionDto> {
    return this.plantPredictionsService.getUserSinglePlantPrediction(
      userId,
      plantPredictionId,
    );
  }

  @Get('photos/:photoPath')
  async getPlantPhoto(
    @Param('photoPath') photoPath: string,
    @Res() res: Response,
  ): Promise<void> {
    return res.sendFile(photoPath, { root: './media' });
  }
}
