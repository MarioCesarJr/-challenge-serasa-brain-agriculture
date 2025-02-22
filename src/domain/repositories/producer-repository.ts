import { Producer } from '../entities/producer';

export interface ProducerRepository {
  create(producer: Producer): Promise<Producer>;
  update(producer: Producer): Promise<Producer>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Producer | null>;
}
