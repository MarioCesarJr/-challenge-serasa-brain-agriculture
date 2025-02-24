import { InMemoryProducerRepository } from '../../../../../test/repositories/in-memory-producer-repository';
import { CreateProducerUseCase } from '../create/create-producer.use-case';
import { DeleteProducerUseCase } from './delete-producer.use-case';
import { CpfCnpjIdentifyService } from '../../../../infra/validators/cpf-cnpj-identify-service';
import { CnpjValidatorService } from '../../../../infra/validators/cnpj-validator-service';
import { CpfValidatorService } from '../../../../infra/validators/cpf-validator-service';

let inMemoryProducerRepository: InMemoryProducerRepository;
let deleteProducerUseCase: DeleteProducerUseCase;
let createProducerUseCase: CreateProducerUseCase;
let cpfCnpjIdentify: CpfCnpjIdentifyService;
let cnpjValidator: CnpjValidatorService;
let cpfValidator: CpfValidatorService;

describe('DeleteProducerUseCase', () => {
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

    deleteProducerUseCase = new DeleteProducerUseCase(
      inMemoryProducerRepository,
    );
  });

  it('should delete a producer', async () => {
    const producer = await createProducerUseCase.execute(
      '40779487000177',
      'Test Producer',
      [],
    );

    await deleteProducerUseCase.execute(producer.id);

    expect(inMemoryProducerRepository.producers.length).toEqual(0);
  });
});
