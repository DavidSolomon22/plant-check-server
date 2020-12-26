import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from 'config/services';
import { PlantPredictionsModule } from 'modules/plant-predictions';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
      inject: [ConfigService],
    }),
    PlantPredictionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
