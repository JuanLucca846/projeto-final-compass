import { Module } from '@nestjs/common';
import { MechanicService } from './mechanic.service';
import { MechanicController } from './mechanic.controller';
import { Mechanic } from './entities/mechanic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Mechanic])],
  controllers: [MechanicController],
  providers: [MechanicService],
})
export class MechanicModule {}
