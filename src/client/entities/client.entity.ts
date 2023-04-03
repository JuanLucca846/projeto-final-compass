import { Car } from 'src/cars/entities/car.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf_cnpj: string;

  @Column()
  client_type: string;

  @Column()
  birthday: Date;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  zipCode: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  neighbourhood: string;

  @Column()
  city: string;

  @OneToMany(() => Car, (car) => car.client)
  cars?: Car[];
}
