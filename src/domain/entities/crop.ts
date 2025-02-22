import { randomUUID } from 'node:crypto';
import { Property } from './property';

export class Crop {
  public id: string;
  public cropName: string;
  public harvestYear: number;
  public property: Property;

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
