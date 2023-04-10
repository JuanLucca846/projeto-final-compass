import { ServiceHasParts } from '../../service/entities/serviceHasParts.entity';
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

  constructor(part?: Partial<Part>) {
    this.id = part?.id;
    this.title = part?.title;
    this.description = part?.description;
    this.qtd = part?.qtd;
    this.unitPrice = part?.unitPrice;
    this.serviceHasParts = part?.serviceHasParts;
  }
}
