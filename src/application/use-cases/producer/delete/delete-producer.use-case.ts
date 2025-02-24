import { Injectable } from '@nestjs/common';
import { ProducerRepository } from '../../../../domain/repositories/producer-repository';

@Injectable()
export class DeleteProducerUseCase {
  constructor(private producerRepository: ProducerRepository) {}

  async execute(id: string): Promise<void> {
    const producer = await this.producerRepository.findById(id);
    if (!producer) {
      throw new Error('Produtor não econtrado');
    }

    await this.producerRepository.delete(id);
  }
}
