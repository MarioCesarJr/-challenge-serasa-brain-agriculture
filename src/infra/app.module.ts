import { Module } from '@nestjs/common';
import { CreateProducerController } from './http/controllers/create-producer.controller';
import { DatabaseModule } from './database/database.module';
import { CreateProducerUseCase } from 'src/application/use-cases/producer/create/create-producer.use-case';
import { UpdateProducerUseCase } from 'src/application/use-cases/producer/update/update-producer.use-case';
import { DeleteProducerUseCase } from 'src/application/use-cases/producer/delete/delete-producer.use-case';
import { UpdateProducerController } from './http/controllers/update-producer.controller';
import { DeleteProducerController } from './http/controllers/delete-producer.controller';
import { GetPropertiesByStateUseCase } from 'src/application/use-cases/property/get-properties-by-state.use-case';
import { GetTotalAreaUseCase } from 'src/application/use-cases/property/get-total-area.use-case';
import { GetTotalPropertiesUseCase } from 'src/application/use-cases/property/get-total-properties.use-case';
import { GetCropsByNameUseCase } from 'src/application/use-cases/crop/get-crops-by-name.use-case';
import { GetDashboardDataUseCase } from 'src/application/use-cases/dashboard/dashboard.use-case';
import { DashboardController } from './http/controllers/dashboard.controller';
import { CpfValidatorService } from './validators/cpf-validator-service';
import { CnpjValidatorService } from './validators/cnpj-validator-service';
import { CpfCnpjIdentifyService } from './validators/cpf-cnpj-identify-service';
import { ValidatorModule } from './validators/validator.module';

@Module({
  imports: [DatabaseModule, ValidatorModule],
  controllers: [
    CreateProducerController,
    UpdateProducerController,
    DeleteProducerController,
    DashboardController,
  ],
  providers: [
    CreateProducerUseCase,
    UpdateProducerUseCase,
    DeleteProducerUseCase,
    GetPropertiesByStateUseCase,
    GetTotalAreaUseCase,
    GetTotalPropertiesUseCase,
    GetCropsByNameUseCase,
    GetDashboardDataUseCase,
    CpfValidatorService,
    CnpjValidatorService,
    CpfCnpjIdentifyService,
  ],
  exports: [CpfValidatorService, CnpjValidatorService, CpfCnpjIdentifyService],
})
export class AppModule {}
