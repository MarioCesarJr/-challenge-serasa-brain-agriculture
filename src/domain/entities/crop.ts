import { randomUUID } from 'node:crypto';
import { Property } from './property';

export class Crop {
  id: string;
  cropName: string;
  harvestYear: number;
  property: Property;

  constructor(
    cropName: string,
    harvestYear: number,
    property: Property,
    id?: string,
  ) {
    this.cropName = cropName;
    this.harvestYear = harvestYear;
    this.property = property;
    this.id = id ?? randomUUID();
  }
}
