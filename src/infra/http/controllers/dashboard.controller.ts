import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
} from '@nestjs/common';
import { GetDashboardDataUseCase } from 'src/application/use-cases/dashboard/dashboard.use-case';

@Controller('dashboard')
export class DashboardController {
  constructor(private getDashboardDataUseCase: GetDashboardDataUseCase) {}

  @Get()
  async handle() {
    try {
      const data = await this.getDashboardDataUseCase.execute();
      return {
        totalProperties: data.totalProperties,
        totalArea: data.totalArea,
        charts: {
          byState: data.propertiesByState,
          byCrop: data.cropsByName,
          landUse: data.landUse,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new HttpException('Erro interno do servidor', 500);
      }
    }
  }
}
