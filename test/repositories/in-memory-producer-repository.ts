import { Producer } from 'src/domain/entities/producer';
import { ProducerRepository } from 'src/domain/repositories/producer-repository';

export class InMemoryProducerRepository implements ProducerRepository {
  public producers: Producer[] = [];

  async create(producer: Producer): Promise<Producer> {
    this.producers.push(producer);
    return producer;
  }

  async update(producer: Producer): Promise<Producer> {
    const index = this.producers.findIndex((p) => p.id === producer.id);
    if (index === -1) throw new Error('Producer not found');
    this.producers[index] = producer;
    return producer;
  }

  async delete(id: string): Promise<void> {
    this.producers = this.producers.filter((p) => p.id !== id);
  }

  async findById(id: string): Promise<Producer | null> {
    return this.producers.find((p) => p.id === id) || null;
  }
}
