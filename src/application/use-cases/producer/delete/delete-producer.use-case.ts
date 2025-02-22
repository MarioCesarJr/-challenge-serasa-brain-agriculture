import { ProducerRepository } from '../../../../domain/repositories/producer-repository';

export class DeleteProducerUseCase {
  constructor(private producerRepository: ProducerRepository) {}

  async execute(id: string): Promise<void> {
    const producer = await this.producerRepository.findById(id);
    if (!producer) {
      throw new Error('Producer not found');
    }

    await this.producerRepository.delete(id);
  }
}
