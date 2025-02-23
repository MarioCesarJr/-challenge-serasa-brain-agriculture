import { ApiProperty } from '@nestjs/swagger';
import { PropertyDTO } from './property-dto';

export class ProducerDTO {
  @ApiProperty()
  public cpfCnpj: string | undefined;
  @ApiProperty()
  public name: string | undefined;
  @ApiProperty()
  public properties: PropertyDTO[] | undefined;
}
