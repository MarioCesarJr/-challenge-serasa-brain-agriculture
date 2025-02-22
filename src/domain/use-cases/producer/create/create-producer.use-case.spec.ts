import { CreateProducerUseCase } from './create-producer.use-case';
import { ProducerRepository } from 'src/domain/repositories/producer-repository';
import { Producer } from 'src/domain/entities/producer';

const fakeRepository: ProducerRepository = {
  create: async (producer: Producer) => {
    return producer;
  },
};

describe('CreateProducerUseCase', () => {
  let createProducerUseCase: CreateProducerUseCase;

  beforeEach(() => {
    createProducerUseCase = new CreateProducerUseCase(fakeRepository);
  });

  it('should create a producer', async () => {
    const producer = await createProducerUseCase.execute(
      '12345678901234',
      'Test Producer',
      [],
    );
    expect(producer.cpfCnpj).toBe('12345678901234');
  });

  it('should invalid cpf/cnpj producer', async () => {
    await expect(
      createProducerUseCase.execute('12345678901234666', 'Test Producer', []),
    ).rejects.toThrow('CPF ou CNPJ inválido');
  });
});
