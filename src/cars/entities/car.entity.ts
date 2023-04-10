import { Client } from '../../client/entities/client.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'car' })
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  license_plate: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  manufacturer: string;

  @Column()
  color: string;

  @Column()
  client_id: string;

  @ManyToOne(() => Client, (client) => client.cars)
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  client?: Client;

  constructor(car?: Partial<Car>) {
    this.id = car?.id;
    this.license_plate = car?.license_plate;
    this.model = car?.model;
    this.year = car?.year;
    this.manufacturer = car?.manufacturer;
    this.color = car?.color;
    this.client_id = car?.client_id;
  }
}
