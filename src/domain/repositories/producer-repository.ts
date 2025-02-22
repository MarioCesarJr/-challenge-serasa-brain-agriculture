import { Producer } from '../entities/producer';

export abstract class ProducerRepository {
  abstract create(producer: Producer): Promise<Producer>;
  abstract update(producer: Producer): Promise<Producer>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Producer | null>;
}
