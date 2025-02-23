import { Injectable } from '@nestjs/common';
import { Producer } from 'src/domain/entities/producer';
import { ProducerRepository } from 'src/domain/repositories/producer-repository';
import { PrismaService } from '../prisma.service';
import { PrismaProducerMapper } from '../mappers/prisma-producer-mapper';

@Injectable()
export class PrismaProducerRepository implements ProducerRepository {
  constructor(private prisma: PrismaService) {}

  async create(producer: Producer): Promise<Producer> {
    const producerCreated = await this.prisma.producer.create({
      data: {
        cpfCnpj: producer.cpfCnpj,
        name: producer.name,
        properties: {
          create: producer.properties.map((property) => ({
            farmName: property.farmName,
            city: property.city,
            state: property.state,
            totalArea: property.totalArea,
            arableArea: property.arableArea,
            vegetationArea: property.vegetationArea,
            crops: {
              create: property?.crops
                ? property.crops.map((crop) => ({
                    cropName: crop.cropName,
                    harvestYear: crop.harvestYear,
                  }))
                : [],
            },
          })),
        },
      },
      include: {
        properties: {
          include: {
            crops: true,
          },
        },
      },
    });

    return PrismaProducerMapper.toDomain(producerCreated);
  }

  async update(producer: Producer): Promise<Producer> {
    const producerUpdated = await this.prisma.producer.update({
      where: { id: producer.id },
      data: {
        cpfCnpj: producer.cpfCnpj,
        name: producer.name,
      },
    });

    return PrismaProducerMapper.toDomain(producerUpdated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.crop.deleteMany({
      where: {
        property: {
          producerId: id,
        },
      },
    });

    await this.prisma.property.deleteMany({
      where: {
        producerId: id,
      },
    });

    await this.prisma.producer.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<Producer | null> {
    const producer = await this.prisma.producer.findUnique({
      where: { id },
      include: {
        properties: true,
      },
    });

    if (!producer) {
      return null;
    }

    return PrismaProducerMapper.toDomain(producer);
  }
}
