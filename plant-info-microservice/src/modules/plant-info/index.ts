/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlantInfoController } from './controllers';
import { PlantInfoRepository } from './repositories';
import { PlantInfo, PlantInfoSchema } from './schemas';
import { PlantInfoService } from './services';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeatureAsync([
      {
        name: PlantInfo.name,
        useFactory: () => {
          const schema = PlantInfoSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [PlantInfoController],
  exports: [],
  providers: [PlantInfoRepository, PlantInfoService],
})
export class PlantInfoModule {}
