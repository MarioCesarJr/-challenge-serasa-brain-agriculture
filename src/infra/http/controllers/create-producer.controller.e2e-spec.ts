import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Create producer (E2E)', () => {
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

  test('[POST] /producers', async () => {
    const response = await request(app.getHttpServer())
      .post('/producers')
      .send({
        cpfCnpj: '12345678000158',
        name: 'Produtor Exemplo',
        properties: [
          {
            farmName: 'Fazenda do Exemplo',
            city: 'Cidade Exemplo',
            state: 'Estado Exemplo',
            totalArea: 1000,
            arableArea: 800,
            vegetationArea: 200,
            crops: [
              {
                cropName: 'Soja',
                harvestYear: 2025,
              },
              {
                cropName: 'Café',
                harvestYear: 2025,
              },
            ],
          },
        ],
      });

    expect(response.statusCode).toBe(201);

    const producerOnDatabase = await prisma.producer.findMany({
      where: {
        cpfCnpj: '12345678000158',
      },
    });

    expect(producerOnDatabase).toBeTruthy();
  });
});
