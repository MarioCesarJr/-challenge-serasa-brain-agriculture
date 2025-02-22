import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaProducerRepository } from './prisma/repositories/prisma-producer-repository';
import { ProducerRepository } from 'src/domain/repositories/producer-repository';

@Module({
  providers: [
    PrismaService,
    { provide: ProducerRepository, useClass: PrismaProducerRepository },
  ],
  exports: [PrismaService, ProducerRepository],
})
export class DatabaseModule {}
