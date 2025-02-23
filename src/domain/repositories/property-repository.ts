export abstract class PropertyRepository {
  abstract getTotalProperties(): Promise<number>;
  abstract getPropertiesByState(): Promise<any[]>;
  abstract getLandUseByType(): Promise<any[]>;
  abstract getTotalArea(): Promise<number>;
}
