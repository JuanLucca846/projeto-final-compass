import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
