import { InMemoryProducerRepository } from '../../../../../test/repositories/in-memory-producer-repository';
import { CreateProducerUseCase } from '../create/create-producer.use-case';
import { UpdateProducerUseCase } from './update-producer.use-case';

let inMemoryProducerRepository: InMemoryProducerRepository;
let updateProducerUseCase: UpdateProducerUseCase;
let createProducerUseCase: CreateProducerUseCase;

describe('UpdateProducerUseCase', () => {
  beforeEach(() => {
    inMemoryProducerRepository = new InMemoryProducerRepository();
    createProducerUseCase = new CreateProducerUseCase(
      inMemoryProducerRepository,
    );
    updateProducerUseCase = new UpdateProducerUseCase(
      inMemoryProducerRepository,
    );
  });

  it('should update a producer', async () => {
    const producer = await createProducerUseCase.execute(
      '12345678901234',
      'Test Producer',
      [],
    );

    const updateProducer = await updateProducerUseCase.execute(
      producer?.id,
      '12345678901234',
      'Test Producer updated',
    );

    expect(updateProducer?.name).toEqual('Test Producer updated');
  });
});
