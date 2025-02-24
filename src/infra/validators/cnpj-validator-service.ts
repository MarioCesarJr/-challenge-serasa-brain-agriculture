import { CnpjValidator } from '@/domain/validators/cnpj-validator';
import { Injectable } from '@nestjs/common';
import { cnpj } from 'cpf-cnpj-validator';

@Injectable()
export class CnpjValidatorService implements CnpjValidator {
  isValid(value: string): boolean {
    if (cnpj.isValid(value)) {
      return true;
    }

    return false;
  }
}
