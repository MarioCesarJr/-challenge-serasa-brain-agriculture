import { Module } from '@nestjs/common';
import { CpfCnpjIdentifyService } from './cpf-cnpj-identify-service';
import { CpfValidatorService } from './cpf-validator-service';
import { CnpjValidatorService } from './cnpj-validator-service';
import { CpfValidator } from '@/domain/validators/cpf-validator';
import { CnpjValidator } from '@/domain/validators/cnpj-validator';
import { CpfCnpjIdentify } from '@/domain/validators/cpf-cnpj-identify';

@Module({
  providers: [
    CpfCnpjIdentifyService,
    CpfCnpjIdentifyService,
    CnpjValidatorService,
    { provide: CpfValidator, useClass: CpfValidatorService },
    { provide: CnpjValidator, useClass: CnpjValidatorService },
    { provide: CpfCnpjIdentify, useClass: CpfCnpjIdentifyService },
  ],
  exports: [
    CpfCnpjIdentifyService,
    CpfCnpjIdentifyService,
    CnpjValidatorService,
    CpfValidator,
    CnpjValidator,
    CpfCnpjIdentify,
  ],
})
export class ValidatorModule {}
