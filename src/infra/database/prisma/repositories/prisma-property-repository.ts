import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PropertyRepository } from 'src/domain/repositories/property-repository';

@Injectable()
export class PrismaPropertyRepository implements PropertyRepository {
  constructor(private prisma: PrismaService) {}

  async getTotalProperties(): Promise<number> {
    return await this.prisma.property.count();
  }

  async getPropertiesByState(): Promise<any[]> {
    return await this.prisma.property.findMany({
      select: {
        state: true,
      },
    });
  }

  async getLandUseByType(): Promise<any[]> {
    return await this.prisma.property.findMany({
      select: {
        arableArea: true,
        vegetationArea: true,
      },
    });
  }

  async getTotalArea(): Promise<number> {
    const properties = await this.prisma.property.findMany({
      select: {
        totalArea: true,
      },
    });

    return properties.reduce((sum, property) => sum + property.totalArea, 0);
  }
}
