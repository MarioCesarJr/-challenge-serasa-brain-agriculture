import { ApiProperty } from '@nestjs/swagger';

export class CropDTO {
  @ApiProperty()
  public cropName?: string;
  @ApiProperty()
  public harvestYear?: number;
}
