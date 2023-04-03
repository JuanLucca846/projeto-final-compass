import { Client } from 'src/client/entities/client.entity';
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
}
