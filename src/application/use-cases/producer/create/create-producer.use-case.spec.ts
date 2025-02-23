import { Property } from '../../../../domain/entities/property';
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

  it('should throw error if the sum of arable and vegetation area exceeds the total area', async () => {
    const propertyA = new Property(
      'Fazenda A',
      'Cidade A',
      'Estado A',
      100,
      60,
      50,
      [],
    );

    await expect(
      createProducerUseCase.execute('12345678901234', 'Test Producer', [
        propertyA,
      ]),
    ).rejects.toThrow(
      'A soma das áreas agricultáveis e de vegetação não pode ultrapassar a área total.',
    );
  });
});
