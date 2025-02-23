import { Injectable } from '@nestjs/common';
import { CropRepository } from 'src/domain/repositories/crop-repository';

@Injectable()
export class GetCropsByNameUseCase {
  constructor(private readonly cropRepository: CropRepository) {}

  async execute(name: string): Promise<any> {
    return await this.cropRepository.getCropsByName(name);
  }
}
