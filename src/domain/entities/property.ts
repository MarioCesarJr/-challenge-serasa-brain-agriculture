import { Crop } from './crop';
import { Producer } from './producer';

export class Property {
  id: number;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  producer: Producer;
  crops: Crop[];

  constructor(
    id: number,
    farmName: string,
    city: string,
    state: string,
    totalArea: number,
    arableArea: number,
    vegetationArea: number,
    producer: Producer,
    crops: Crop[],
  ) {
    this.id = id;
    this.farmName = farmName;
    this.city = city;
    this.state = state;
    this.totalArea = totalArea;
    this.arableArea = arableArea;
    this.vegetationArea = vegetationArea;
    this.producer = producer;
    this.crops = crops;
  }
}
