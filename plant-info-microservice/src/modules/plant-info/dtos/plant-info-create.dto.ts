import { IsNotEmpty, IsString } from 'class-validator';

class PlantOverviewCreateDto {
  sun: string;
  water: string;
  potSize: string;
  fertalizer: string;
}

class PlantDetailsCreateDto {
  sun: string;
  water: string;
  potSize: string;
  fertalizer: string;
  photoPaths: string[];
}

export class PlantInfoCreateDto {
  @IsNotEmpty()
  @IsString()
  plantName: string;

  @IsNotEmpty()
  plantOverview: PlantOverviewCreateDto;

  @IsNotEmpty()
  plantDetails: PlantDetailsCreateDto;
}
