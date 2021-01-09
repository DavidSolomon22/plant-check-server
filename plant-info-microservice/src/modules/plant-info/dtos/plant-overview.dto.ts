import { Expose } from 'class-transformer';

export class PlantOverviewDto {
  @Expose()
  sun: string;

  @Expose()
  water: string;

  @Expose()
  potSize: string;

  // @Expose()
  fertalizer: string;
}
