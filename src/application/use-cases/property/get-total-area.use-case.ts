import { Injectable } from '@nestjs/common';
import { PropertyRepository } from 'src/domain/repositories/property-repository';

@Injectable()
export class GetTotalAreaUseCase {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(): Promise<number> {
    return await this.propertyRepository.getTotalArea();
  }
}
