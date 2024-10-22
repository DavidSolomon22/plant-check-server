/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlantPredictionsController } from './controllers';
import { PlantPredictionsRepository } from './repositories';
import { PlantPredictions, PlantPredictionsSchema } from './schemas';
import { PlantPredictionsService } from './services';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeatureAsync([
      {
        name: PlantPredictions.name,
        useFactory: () => {
          const schema = PlantPredictionsSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [PlantPredictionsController],
  exports: [],
  providers: [PlantPredictionsRepository, PlantPredictionsService],
})
export class PlantPredictionsModule {}
