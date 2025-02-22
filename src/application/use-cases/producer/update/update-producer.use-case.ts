import { Injectable } from '@nestjs/common';
import { Producer } from '../../../../domain/entities/producer';
import { Property } from '../../../../domain/entities/property';
import { ProducerRepository } from '../../../../domain/repositories/producer-repository';

@Injectable()
export class UpdateProducerUseCase {
  constructor(private producerRepository: ProducerRepository) {}

  async execute(
    id: string,
    cpfCnpj: string,
    name: string,
    properties: Property[],
  ): Promise<Producer> {
    const producer = await this.producerRepository.findById(id);
    if (!producer) {
      throw new Error('Producer not found');
    }

    if (!this.isValidCpfCnpj(cpfCnpj)) {
      throw new Error('CPF or CNPJ invalid');
    }

    producer.cpfCnpj = cpfCnpj;
    producer.name = name;
    producer.properties = properties;

    return this.producerRepository.update(producer);
  }

  private isValidCpfCnpj(cpfCnpj: string): boolean {
    const regex = /^(?:\d{11}|\d{14})$/;
    return regex.test(cpfCnpj);
  }
}
