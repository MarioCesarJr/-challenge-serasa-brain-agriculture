import { CpfValidator } from '@/domain/validators/cpf-validator';
import { Injectable } from '@nestjs/common';
import { cpf } from 'cpf-cnpj-validator';

@Injectable()
export class CpfValidatorService implements CpfValidator {
  isValid(value: string): boolean {
    if (cpf.isValid(value)) {
      return true;
    }

    return false;
  }
}
