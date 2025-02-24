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
    const data = await this.prisma.property.groupBy({
      by: ['state'],
      _sum: {
        totalArea: true,
      },
    });

    return data.map((item) => ({
      name: item.state,
      totalArea: item._sum.totalArea,
    }));
  }

  async getLandUseByType(): Promise<any[]> {
    const properties = await this.prisma.property.findMany();

    const arableArea = properties.reduce(
      (acc, property) => acc + property.arableArea,
      0,
    );
    const vegetationArea = properties.reduce(
      (acc, property) => acc + property.vegetationArea,
      0,
    );

    return [
      {
        name: 'Área Agricultável',
        value: arableArea,
      },
      {
        name: 'Área de Vegetação',
        value: vegetationArea,
      },
    ];
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
