import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'mechanic' })
export class Mechanic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  birthday: Date;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'hiring_date' })
  hiringDate: Date;

  @Column({ name: 'service_fee' })
  serviceFee: number;

  @Column()
  status: string;

  @Column({ type: 'json' })
  specialities: string[];

  constructor(mechanic?: Partial<Mechanic>) {
    this.id = mechanic?.id;
    this.name = mechanic?.name;
    this.cpf = mechanic?.cpf;
    this.birthday = mechanic?.birthday;
    this.phone = mechanic?.phone;
    this.email = mechanic?.email;
    this.password = mechanic?.password;
    this.hiringDate = mechanic?.hiringDate;
    this.serviceFee = mechanic?.serviceFee;
    this.status = mechanic?.status;
    this.specialities = mechanic?.specialities;
  }
}
