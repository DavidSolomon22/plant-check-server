export class PlantInfoCreateDto {
  plantName: string;
  plantOverview: {
    sun: string;
    water: string;
    potSize: string;
    fertalizer: string;
  };
}
