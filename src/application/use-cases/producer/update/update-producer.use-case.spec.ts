import { InMemoryProducerRepository } from '../../../../../test/repositories/in-memory-producer-repository';
import { CreateProducerUseCase } from '../create/create-producer.use-case';
import { UpdateProducerUseCase } from './update-producer.use-case';
import { CpfCnpjIdentifyService } from '../../../../infra/validators/cpf-cnpj-identify-service';
import { CnpjValidatorService } from '../../../../infra/validators/cnpj-validator-service';
import { CpfValidatorService } from '../../../../infra/validators/cpf-validator-service';

let inMemoryProducerRepository: InMemoryProducerRepository;
let updateProducerUseCase: UpdateProducerUseCase;
let createProducerUseCase: CreateProducerUseCase;
let cpfCnpjIdentify: CpfCnpjIdentifyService;
let cnpjValidator: CnpjValidatorService;
let cpfValidator: CpfValidatorService;

describe('UpdateProducerUseCase', () => {
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
    updateProducerUseCase = new UpdateProducerUseCase(
      inMemoryProducerRepository,
      cpfCnpjIdentify,
      cnpjValidator,
      cpfValidator,
    );
  });

  it('should update a producer', async () => {
    const producer = await createProducerUseCase.execute(
      '40779487000177',
      'Test Producer',
      [],
    );

    const updateProducer = await updateProducerUseCase.execute(
      producer?.id,
      '64100837000195',
      'Test Producer updated',
    );

    expect(updateProducer?.name).toEqual('Test Producer updated');
  });
});
