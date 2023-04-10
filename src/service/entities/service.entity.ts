import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ServiceHasParts } from './serviceHasParts.entity';

@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'client_id' })
  clientId: string;

  @Column({ name: 'car_id' })
  carId: string;

  @Column({ name: 'mechanic_id' })
  mechanicId: string;

  @Column({ name: 'service_estimated_delivery_date' })
  serviceEstimatedDeliveryDate: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @OneToMany(
    () => ServiceHasParts,
    (serviceHasParts) => serviceHasParts.service,
    { cascade: true },
  )
  serviceHasParts: ServiceHasParts[];

  constructor(service?: Partial<Service>) {
    this.id = service?.id;
    this.clientId = service?.clientId;
    this.carId = service?.carId;
    this.mechanicId = service?.mechanicId;
    this.serviceEstimatedDeliveryDate = service?.serviceEstimatedDeliveryDate;
    this.description = service?.description;
    this.status = service?.status;
    this.serviceHasParts = service?.serviceHasParts;
  }
}
