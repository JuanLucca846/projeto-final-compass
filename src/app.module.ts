import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import { Client } from './client/entities/client.entity';
import { MechanicModule } from './mechanic/mechanic.module';
import { Mechanic } from './mechanic/entities/mechanic.entity';

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
      entities: [Client, Mechanic],
      logging: false,
    }),
    ClientModule,
    MechanicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
