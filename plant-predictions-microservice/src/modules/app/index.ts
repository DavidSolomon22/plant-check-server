import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseConfigService, MulterConfigService } from 'config/services';
import { PlantPredictionsModule } from 'modules/plant-predictions';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
      inject: [ConfigService],
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: MulterConfigService,
      inject: [ConfigService],
    }),
    PlantPredictionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
