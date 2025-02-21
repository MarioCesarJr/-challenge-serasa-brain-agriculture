import { randomUUID } from 'node:crypto';
import { Crop } from './crop';
import { Producer } from './producer';

export class Property {
  public id: string;
  public farmName: string;
  public city: string;
  public state: string;
  public totalArea: number;
  public arableArea: number;
  public vegetationArea: number;
  public producer: Producer;
  public crops: Crop[];

  constructor(
    farmName: string,
    city: string,
    state: string,
    totalArea: number,
    arableArea: number,
    vegetationArea: number,
    producer: Producer,
    crops: Crop[],
    id?: string,
  ) {
    this.farmName = farmName;
    this.city = city;
    this.state = state;
    this.totalArea = totalArea;
    this.arableArea = arableArea;
    this.vegetationArea = vegetationArea;
    this.producer = producer;
    this.crops = crops;
    this.id = id ?? randomUUID();
  }
}
