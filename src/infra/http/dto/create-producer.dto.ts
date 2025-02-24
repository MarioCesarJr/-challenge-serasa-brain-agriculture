import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

class CropDto {
  @ApiProperty({
    description: 'Nome da cultura',
    example: 'Soja',
  })
  @IsString()
  @IsNotEmpty()
  cropName: string | undefined;

  @ApiProperty({
    description: 'Ano da colheita',
    example: 2025,
  })
  @IsInt()
  harvestYear: number | undefined;
}

class PropertyDto {
  @ApiProperty({
    description: 'Nome da fazenda',
    example: 'Fazenda do Exemplo',
  })
  @IsString()
  @IsNotEmpty()
  farmName: string | undefined;

  @ApiProperty({
    description: 'Cidade onde a fazenda está localizada',
    example: 'Cidade Exemplo',
  })
  @IsString()
  @IsNotEmpty()
  city: string | undefined;

  @ApiProperty({
    description: 'Estado onde a fazenda está localizada',
    example: 'Estado Exemplo',
  })
  @IsString()
  @IsNotEmpty()
  state: string | undefined;

  @ApiProperty({
    description: 'Área total da fazenda',
    example: 1000,
  })
  @IsInt()
  totalArea: number | undefined;

  @ApiProperty({
    description: 'Área arável da fazenda',
    example: 800,
  })
  @IsInt()
  arableArea: number | undefined;

  @ApiProperty({
    description: 'Área de vegetação da fazenda',
    example: 200,
  })
  @IsInt()
  vegetationArea: number | undefined;

  @ApiProperty({
    description: 'Lista de culturas plantadas na fazenda',
    type: [CropDto],
  })
  @IsArray()
  crops: CropDto[] | undefined;
}

export class CreateProducerDto {
  @ApiProperty({
    description: 'CPF ou CNPJ do produtor',
    example: '12345678000158',
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

  @ApiProperty({
    description: 'Lista de propriedades do produtor',
    type: [PropertyDto],
  })
  @IsArray()
  properties: PropertyDto[] | undefined;
}
