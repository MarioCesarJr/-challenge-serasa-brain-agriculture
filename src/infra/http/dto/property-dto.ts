import { ApiProperty } from '@nestjs/swagger';
import { CropDTO } from './crop-dto';

export class PropertyDTO {
  @ApiProperty()
  public farmName?: string;
  @ApiProperty()
  public city?: string;
  @ApiProperty()
  public state?: string;
  @ApiProperty()
  public totalArea?: number;
  @ApiProperty()
  public arableArea?: number;
  @ApiProperty()
  public vegetationArea?: number;
  @ApiProperty()
  public crops?: CropDTO[];
}
