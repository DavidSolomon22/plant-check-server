import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PlantOverviewCreateDto {
  @IsNotEmpty()
  @IsString()
  sun: string;

  @IsNotEmpty()
  @IsString()
  water: string;

  @IsNotEmpty()
  @IsString()
  potSize: string;

  @IsNotEmpty()
  @IsString()
  fertalizer: string;
}

export class PlantDetailsCreateDto {
  @IsNotEmpty()
  @IsString()
  sun: string;

  @IsNotEmpty()
  @IsString()
  water: string;

  @IsNotEmpty()
  @IsString()
  potSize: string;

  @IsNotEmpty()
  @IsString()
  fertalizer: string;
}

export class PlantInfoCreateDto {
  @IsNotEmpty()
  @IsString()
  plantName: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PlantOverviewCreateDto)
  plantOverview: PlantOverviewCreateDto;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PlantDetailsCreateDto)
  plantDetails: PlantDetailsCreateDto;
}
