import { Property } from './property';

export class Producer {
  id: number;
  cpfCnpj: string;
  name: string;
  properties: Property[];

  constructor(
    id: number,
    cpfCnpj: string,
    name: string,
    properties: Property[],
  ) {
    this.id = id;
    this.cpfCnpj = cpfCnpj;
    this.name = name;
    this.properties = properties;
  }
}
