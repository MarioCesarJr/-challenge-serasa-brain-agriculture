import { Injectable } from '@nestjs/common';
import { PropertyRepository } from 'src/domain/repositories/property-repository';

@Injectable()
export class GetPropertiesByStateUseCase {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(): Promise<any> {
    return await this.propertyRepository.getPropertiesByState();
  }
}
