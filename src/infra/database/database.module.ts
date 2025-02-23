import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaProducerRepository } from './prisma/repositories/prisma-producer-repository';
import { ProducerRepository } from 'src/domain/repositories/producer-repository';
import { PropertyRepository } from 'src/domain/repositories/property-repository';
import { PrismaPropertyRepository } from './prisma/repositories/prisma-property-repository';
import { PrismaCropRepository } from './prisma/repositories/prisma-crop-repository';
import { CropRepository } from 'src/domain/repositories/crop-repository';

@Module({
  providers: [
    PrismaService,
    { provide: ProducerRepository, useClass: PrismaProducerRepository },
    { provide: PropertyRepository, useClass: PrismaPropertyRepository },
    { provide: CropRepository, useClass: PrismaCropRepository },
  ],
  exports: [
    PrismaService,
    ProducerRepository,
    PropertyRepository,
    CropRepository,
  ],
})
export class DatabaseModule {}
