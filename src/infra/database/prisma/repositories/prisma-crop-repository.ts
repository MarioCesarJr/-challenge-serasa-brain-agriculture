import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CropRepository } from 'src/domain/repositories/crop-repository';

@Injectable()
export class PrismaCropRepository implements CropRepository {
  constructor(private prisma: PrismaService) {}

  async getCropsByName(): Promise<any[]> {
    const data = await this.prisma.crop.groupBy({
      by: ['cropName'],
      _count: {
        id: true,
      },
    });

    return data.map((item) => ({
      cropName: item.cropName,
      value: item._count.id,
    }));
  }
}
