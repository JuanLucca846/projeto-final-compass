import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { Service } from './entities/service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from 'src/parts/entities/part.entity';
import { ServiceHasParts } from './entities/serviceHasParts.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service, Part, ServiceHasParts]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
