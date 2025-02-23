import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CropRepository } from 'src/domain/repositories/crop-repository';

@Injectable()
export class PrismaCropRepository implements CropRepository {
  constructor(private prisma: PrismaService) {}

  async getCropsByName(cropName: string): Promise<any[]> {
    return this.prisma.crop.findMany({
      where: {
        cropName: {
          contains: cropName,
          mode: 'insensitive',
        },
      },
    });
  }
}
