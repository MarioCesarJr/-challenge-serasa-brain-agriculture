import { randomUUID } from 'node:crypto';
import { Property } from './property';

export class Producer {
  public id: string;
  public cpfCnpj: string;
  public name: string;
  public properties: Property[];

  constructor(
    cpfCnpj: string,
    name: string,
    properties: Property[],
    id?: string,
  ) {
    this.cpfCnpj = cpfCnpj;
    this.name = name;
    this.properties = properties;
    this.id = id ?? randomUUID();
  }
}
