import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateProducerUseCase } from 'src/application/use-cases/producer/create/create-producer.use-case';
import { Producer } from 'src/domain/entities/producer';
import { CreateProducerDto } from '../dto/create-producer.dto';

@Controller('producers')
export class CreateProducerController {
  private readonly logger = new Logger(CreateProducerController.name, {
    timestamp: true,
  });

  constructor(private createProducer: CreateProducerUseCase) {}

  @Post()
  @HttpCode(201)
  @ApiBody({ type: CreateProducerDto })
  async handle(@Body() body: Producer) {
    const { cpfCnpj, name, properties } = body;

    this.logger.log(`create producer ${JSON.stringify(body, null, 2)}`);

    try {
      const producer = await this.createProducer.execute(
        cpfCnpj,
        name,
        properties ?? [],
      );

      return producer;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(error);
        throw new BadRequestException(error.message);
      } else {
        throw new HttpException('Erro interno do servidor', 500);
      }
    }
  }
}
