import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { Service } from './entities/service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from 'src/parts/entities/part.entity';
import { ServiceHasParts } from './entities/serviceHasParts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, Part, ServiceHasParts])],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
