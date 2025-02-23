import { Injectable } from '@nestjs/common';
import { Producer } from '../../../../domain/entities/producer';
import { Property } from '../../../../domain/entities/property';
import { ProducerRepository } from '../../../../domain/repositories/producer-repository';

@Injectable()
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

    if (properties.length > 0) {
      properties.forEach((obj) => {
        if (obj.arableArea + obj.vegetationArea > obj.totalArea) {
          throw new Error(
            'A soma das áreas agricultáveis e de vegetação não pode ultrapassar a área total.',
          );
        }
      });
    }

    const producer = new Producer(cpfCnpj, name, properties);

    await this.producerRepository.create(producer);
    return producer;
  }

  private isValidCpfCnpj(cpfCnpj: string): boolean {
    const regex = /^(?:\d{11}|\d{14})$/;
    return regex.test(cpfCnpj);
  }
}
