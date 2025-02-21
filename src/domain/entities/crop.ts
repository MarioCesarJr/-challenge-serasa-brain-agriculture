import { Property } from './property';

export class Crop {
  id: number;
  cropName: string;
  harvestYear: number;
  property: Property;

  constructor(
    id: number,
    cropName: string,
    harvestYear: number,
    property: Property,
  ) {
    this.id = id;
    this.cropName = cropName;
    this.harvestYear = harvestYear;
    this.property = property;
  }
}
