import { ServiceHasParts } from 'src/service/entities/serviceHasParts.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'parts' })
export class Part {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'qtd_stock' })
  qtd: number;

  @Column({ name: 'unit_price' })
  unitPrice: number;

  @OneToMany(() => ServiceHasParts, (serviceHasParts) => serviceHasParts.parts)
  serviceHasParts?: ServiceHasParts[];
}
