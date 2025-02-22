import { InMemoryProducerRepository } from '../../../../../test/repositories/in-memory-producer-repository';
import { CreateProducerUseCase } from './create-producer.use-case';

let inMemoryProducerRepository: InMemoryProducerRepository;
let createProducerUseCase: CreateProducerUseCase;

describe('CreateProducerUseCase', () => {
  beforeEach(() => {
    inMemoryProducerRepository = new InMemoryProducerRepository();
    createProducerUseCase = new CreateProducerUseCase(
      inMemoryProducerRepository,
    );
  });

  it('should create a producer', async () => {
    const producer = await createProducerUseCase.execute(
      '12345678901234',
      'Test Producer',
      [],
    );
    expect(producer.cpfCnpj).toBe('12345678901234');
    expect(inMemoryProducerRepository.producers[0].id).toEqual(producer.id);
  });

  it('should invalid cpf/cnpj producer', async () => {
    await expect(
      createProducerUseCase.execute('12345678901234666', 'Test Producer', []),
    ).rejects.toThrow('CPF ou CNPJ inválido');
  });
});
