import { Crop } from '../entities/crop';

export abstract class CropRepository {
  abstract getCropsByName(): Promise<Crop[]>;
}
