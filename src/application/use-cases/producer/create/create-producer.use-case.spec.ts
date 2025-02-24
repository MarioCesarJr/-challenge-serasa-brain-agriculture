import { Property } from '../../../../domain/entities/property';
import { InMemoryProducerRepository } from '../../../../../test/repositories/in-memory-producer-repository';
import { CreateProducerUseCase } from './create-producer.use-case';
import { CpfCnpjIdentifyService } from '../../../../infra/validators/cpf-cnpj-identify-service';
import { CnpjValidatorService } from '../../../../infra/validators/cnpj-validator-service';
import { CpfValidatorService } from '../../../../infra/validators/cpf-validator-service';

let inMemoryProducerRepository: InMemoryProducerRepository;
let createProducerUseCase: CreateProducerUseCase;
let cpfCnpjIdentify: CpfCnpjIdentifyService;
let cnpjValidator: CnpjValidatorService;
let cpfValidator: CpfValidatorService;

describe('CreateProducerUseCase', () => {
  beforeEach(() => {
    inMemoryProducerRepository = new InMemoryProducerRepository();
    cpfCnpjIdentify = new CpfCnpjIdentifyService();
    cnpjValidator = new CnpjValidatorService();
    cpfValidator = new CpfValidatorService();

    createProducerUseCase = new CreateProducerUseCase(
      inMemoryProducerRepository,
      cpfCnpjIdentify,
      cnpjValidator,
      cpfValidator,
    );
  });

  it('should create a producer', async () => {
    const producer = await createProducerUseCase.execute(
      '40779487000177',
      'Test Producer',
      [],
    );
    expect(producer.cpfCnpj).toBe('40779487000177');
    expect(inMemoryProducerRepository.producers[0].id).toEqual(producer.id);
  });

  it('should invalid cnpj producer', async () => {
    await expect(
      createProducerUseCase.execute('40779487000178', 'Test Producer', []),
    ).rejects.toThrow('CNPJ inválido');
  });

  it('should invalid cpf producer', async () => {
    await expect(
      createProducerUseCase.execute('96428259022', 'Test Producer', []),
    ).rejects.toThrow('CPF inválido');
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
      createProducerUseCase.execute('40779487000177', 'Test Producer', [
        propertyA,
      ]),
    ).rejects.toThrow(
      'A soma das áreas agricultáveis e de vegetação não pode ultrapassar a área total.',
    );
  });
});
