import { Part } from '../../parts/entities/part.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Service } from './service.entity';

@Entity({ name: 'service_has_parts' })
export class ServiceHasParts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'services_id' })
  servicesId: string;

  @Column({ name: 'parts_id' })
  partsId: string;

  @Column()
  qtd: number;

  @Column({ name: 'unit_price' })
  unitPrice: number;

  @ManyToOne(() => Service, (service) => service.serviceHasParts)
  @JoinColumn({ name: 'services_id' })
  service?: Service;

  @ManyToOne(() => Part, (parts) => parts.serviceHasParts)
  @JoinColumn({ name: 'parts_id' })
  parts?: Part;
}
