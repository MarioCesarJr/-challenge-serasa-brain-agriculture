import { Producer } from '../../../entities/producer';
import { Property } from '../../../entities/property';
import { ProducerRepository } from '../../../repositories/producer-repository';

export class CreateProducerUseCase {
  constructor(private producerRepository: ProducerRepository) {}

  async execute(
    cpfCnpj: string,
    name: string,
    properties: Property[],
  ): Promise<Producer> {
    if (!this.isValidCpfCnpj(cpfCnpj)) {
      throw new Error('CPF ou CNPJ inválido');
    }

    const producer = new Producer(cpfCnpj, name, properties);
    return await this.producerRepository.create(producer);
  }

  private isValidCpfCnpj(cpfCnpj: string): boolean {
    const regex = /^(?:\d{11}|\d{14})$/;
    return regex.test(cpfCnpj);
  }
}
