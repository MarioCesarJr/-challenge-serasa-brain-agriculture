import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  HttpException,
  Param,
} from '@nestjs/common';
import { DeleteProducerUseCase } from 'src/application/use-cases/producer/delete/delete-producer.use-case';

@Controller('producers/:id')
export class DeleteProducerController {
  constructor(private deleteProducer: DeleteProducerUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    try {
      return await this.deleteProducer.execute(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new HttpException('Erro interno do servidor', 500);
      }
    }
  }
}
