import { Injectable } from '@nestjs/common';
import { Producer } from '../../../../domain/entities/producer';
import { Property } from '../../../../domain/entities/property';
import { ProducerRepository } from '../../../../domain/repositories/producer-repository';
import { CpfCnpjIdentify } from '../../../../domain/validators/cpf-cnpj-identify';
import { CpfValidator } from '../../../../domain/validators/cpf-validator';
import { CnpjValidator } from '../../../../domain/validators/cnpj-validator';

@Injectable()
export class CreateProducerUseCase {
  constructor(
    private producerRepository: ProducerRepository,
    private cpfCnpjIdentify: CpfCnpjIdentify,
    private cnpjValidator: CnpjValidator,
    private cpfValidator: CpfValidator,
  ) {}

  async execute(
    cpfCnpj: string,
    name: string,
    properties: Property[],
  ): Promise<Producer> {
    const documentType = this.cpfCnpjIdentify.check(cpfCnpj);

    if (documentType === 'CNPJ' && !this.cnpjValidator.isValid(cpfCnpj)) {
      throw new Error('CNPJ inválido');
    }

    if (documentType === 'CPF' && !this.cpfValidator.isValid(cpfCnpj)) {
      throw new Error('CPF inválido');
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

    const producerCreated = await this.producerRepository.create(producer);

    producer.id = producerCreated.id;

    return producer;
  }
}
