import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import { CreateProducerUseCase } from 'src/application/use-cases/producer/create/create-producer.use-case';
import { Producer } from 'src/domain/entities/producer';

@Controller('producers')
export class CreateProducerController {
  constructor(private createProducer: CreateProducerUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: Producer) {
    const { cpfCnpj, name, properties } = body;

    try {
      const producer = await this.createProducer.execute(
        cpfCnpj,
        name,
        properties,
      );

      return producer;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new HttpException('Erro interno do servidor', 500);
      }
    }
  }
}
