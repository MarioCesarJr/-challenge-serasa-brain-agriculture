import { Producer } from '../entities/producer';

export interface ProducerRepository {
  create(producer: Producer): Promise<Producer>;
}
