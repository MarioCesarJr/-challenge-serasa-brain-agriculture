import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  Logger,
  Param,
  Put,
} from '@nestjs/common';
import { UpdateProducerUseCase } from 'src/application/use-cases/producer/update/update-producer.use-case';
import { Producer } from 'src/domain/entities/producer';
import { UpdateProducerDto } from '../dto/update-producer.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('producers/:id')
export class UpdateProducerController {
  private readonly logger = new Logger(UpdateProducerController.name, {
    timestamp: true,
  });

  constructor(private updateProducer: UpdateProducerUseCase) {}

  @Put()
  @HttpCode(200)
  @ApiBody({ type: UpdateProducerDto })
  async handle(@Param('id') id: string, @Body() body: Producer) {
    const { cpfCnpj, name } = body;

    this.logger.log(`update producer ${JSON.stringify(body, null, 2)}`);

    try {
      const producer = await this.updateProducer.execute(id, cpfCnpj, name);

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
