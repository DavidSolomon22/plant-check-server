import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterUtilsService } from 'utils/services';
import { PlantInfoCreateDto } from '../dtos';
import { PlantInfoService } from '../services';
import { Express, Response, Request } from 'express';
import { FileFieldRequiredException } from 'exceptions';

@Controller()
export class PlantInfoController {
  constructor(private plantInfoService: PlantInfoService) {}

  @Post('log')
  async log(@Req() req: Request, @Res() res: Response): Promise<void> {
    console.log('req.body.request :>> ', req.body.request);
  }

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

  @Post('plant-infos/:plantName/photos')
  @UseInterceptors(
    FileInterceptor('plantPhoto', {
      storage: MulterUtilsService.plantPhotoDiskStorage(),
      fileFilter: MulterUtilsService.plantPhotoFileFilter,
    }),
  )
  async uploadPhotoForPlantDetails(
    @Param('plantName') plantName: string,
    @UploadedFile() plantPhoto: Express.Multer.File,
  ): Promise<void> {
    if (!plantPhoto) {
      throw new FileFieldRequiredException('plantPhoto');
    }
    await this.plantInfoService.uploadPhotoForPlantDetails(
      plantName,
      plantPhoto,
    );
  }

  @Get('plant-infos/:plantName/photos/:photoPath')
  async getPlantPhotoForDetails(
    @Param('plantName') plantName: string,
    @Param('photoPath') photoPath: string,
    @Res() res: Response,
  ): Promise<any> {
    return res.sendFile(photoPath, { root: './media' });
  }
}
