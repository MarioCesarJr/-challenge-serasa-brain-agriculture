import { Injectable } from '@nestjs/common';
import { PropertyRepository } from 'src/domain/repositories/property-repository';

@Injectable()
export class GetTotalPropertiesUseCase {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(): Promise<number> {
    return await this.propertyRepository.getTotalProperties();
  }
}
