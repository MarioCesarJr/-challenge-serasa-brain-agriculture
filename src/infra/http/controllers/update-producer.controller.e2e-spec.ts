import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Update producer (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[PUT] /producers/:id', async () => {
    const producerCreated = await prisma.producer.create({
      data: {
        cpfCnpj: '10792719000166',
        name: 'Produtor Exemplo',
        properties: {
          create: [
            {
              farmName: 'Fazenda do Exemplo',
              city: 'Cidade Exemplo',
              state: 'Estado Exemplo',
              totalArea: 1000,
              arableArea: 800,
              vegetationArea: 200,
              crops: {
                create: [
                  {
                    cropName: 'Soja',
                    harvestYear: 2025,
                  },
                  {
                    cropName: 'Milho',
                    harvestYear: 2025,
                  },
                ],
              },
            },
          ],
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

    const response = await request(app.getHttpServer())
      .put(`/producers/${producerCreated.id}`)
      .send({
        cpfCnpj: '82630034000124',
        name: 'Produtor Exemplo atualizado',
      });

    expect(response.statusCode).toBe(200);

    const producerOnDatabase = await prisma.producer.findMany({
      where: {
        cpfCnpj: '82630034000124',
      },
    });

    expect(producerOnDatabase).toBeTruthy();
  });
});
