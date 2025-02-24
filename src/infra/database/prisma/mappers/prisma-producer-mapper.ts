import { Producer as PrismaProducer } from '@prisma/client';
import { Producer } from 'src/domain/entities/producer';

export class PrismaProducerMapper {
  static toDomain(raw: PrismaProducer): Producer {
    return new Producer(raw.cpfCnpj, raw.name, [], raw.id);
  }
}
