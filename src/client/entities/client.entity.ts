import { Car } from '../../cars/entities/car.entity';
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

  constructor(client?: Partial<Client>) {
    this.id = client?.id;
    this.name = client?.name;
    this.cpf_cnpj = client?.cpf_cnpj;
    this.client_type = client?.client_type;
    this.birthday = client?.birthday;
    this.phone = client?.phone;
    this.email = client?.email;
    this.password = client?.password;
    this.zipCode = client?.zipCode;
    this.street = client?.street;
    this.number = client?.number;
    this.neighbourhood = client?.neighbourhood;
    this.city = client?.city;
    this.cars = client?.cars;
  }
}
