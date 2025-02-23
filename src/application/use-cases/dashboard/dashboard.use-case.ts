import { Injectable } from '@nestjs/common';
import { CropRepository } from 'src/domain/repositories/crop-repository';
import { PropertyRepository } from 'src/domain/repositories/property-repository';

@Injectable()
export class GetDashboardDataUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly cropRepository: CropRepository,
  ) {}

  async execute() {
    const totalProperties = await this.propertyRepository.getTotalProperties();

    const totalArea = await this.propertyRepository.getTotalArea();

    const propertiesByState =
      await this.propertyRepository.getPropertiesByState();
    const cropsByName = await this.cropRepository.getCropsByName('');
    const landUse = await this.propertyRepository.getLandUseByType();

    return {
      totalProperties,
      totalArea,
      propertiesByState,
      cropsByName,
      landUse,
    };
  }
}
