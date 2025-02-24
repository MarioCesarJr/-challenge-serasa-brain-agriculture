import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProducerDto {
  @ApiProperty({
    description: 'CPF ou CNPJ do produtor',
    example: '98584893000164',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  cpfCnpj: string | undefined;

  @ApiProperty({
    description: 'Nome do produtor',
    example: 'Produtor Exemplo',
  })
  @IsString()
  @IsNotEmpty()
  name: string | undefined;
}
