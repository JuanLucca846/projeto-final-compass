import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import { Client } from './client/entities/client.entity';
import { MechanicModule } from './mechanic/mechanic.module';
import { Mechanic } from './mechanic/entities/mechanic.entity';
import { CarsModule } from './cars/cars.module';
import { Car } from './cars/entities/car.entity';
import { ServiceModule } from './service/service.module';
import { PartsModule } from './parts/parts.module';
import { Service } from './service/entities/service.entity';
import { Part } from './parts/entities/part.entity';
import { ServiceHasParts } from './service/entities/serviceHasParts.entity';
import { LoginModule } from './login/login.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      entities: [Client, Mechanic, Car, Service, Part, ServiceHasParts],
      logging: false,
    }),
    ClientModule,
    MechanicModule,
    CarsModule,
    ServiceModule,
    PartsModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
