import { InMemoryProducerRepository } from '../../../../../test/repositories/in-memory-producer-repository';
import { CreateProducerUseCase } from '../create/create-producer.use-case';
import { DeleteProducerUseCase } from './delete-producer.use-case';

let inMemoryProducerRepository: InMemoryProducerRepository;
let deleteProducerUseCase: DeleteProducerUseCase;
let createProducerUseCase: CreateProducerUseCase;

describe('DeleteProducerUseCase', () => {
  beforeEach(() => {
    inMemoryProducerRepository = new InMemoryProducerRepository();
    createProducerUseCase = new CreateProducerUseCase(
      inMemoryProducerRepository,
    );
    deleteProducerUseCase = new DeleteProducerUseCase(
      inMemoryProducerRepository,
    );
  });

  it('should delete a producer', async () => {
    const producer = await createProducerUseCase.execute(
      '12345678901234',
      'Test Producer',
      [],
    );

    await deleteProducerUseCase.execute(producer.id);

    expect(inMemoryProducerRepository.producers.length).toEqual(0);
  });
});
