import { CpfCnpjIdentify } from '@/domain/validators/cpf-cnpj-identify';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CpfCnpjIdentifyService implements CpfCnpjIdentify {
  check(value: string): 'CPF' | 'CNPJ' | 'INVALID' {
    const onlyNumbers = value.replace(/\D/g, '');

    if (onlyNumbers.length === 11) {
      return 'CPF';
    } else if (onlyNumbers.length === 14) {
      return 'CNPJ';
    } else {
      return 'INVALID';
    }
  }
}
