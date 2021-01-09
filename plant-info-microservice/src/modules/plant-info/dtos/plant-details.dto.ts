import { Expose } from 'class-transformer';

export class PlantDetailsDto {
  @Expose()
  sun: string;

  @Expose()
  water: string;

  @Expose()
  potSize: string;

  @Expose()
  fertalizer: string;

  @Expose()
  photoPaths: string[];
}
