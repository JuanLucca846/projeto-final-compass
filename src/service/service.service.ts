import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FindAllServiceQueryParams } from './dto/service/findAllServiceQueryParams.dto';
import { ServiceHasParts } from './entities/serviceHasParts.entity';

import { v4 as uuidv4 } from 'uuid';
import { Part } from 'src/parts/entities/part.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(Part)
    private partRepository: Repository<Part>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    let serviceData: Service = {
      id: uuidv4(),
      clientId: createServiceDto.clientId,
      carId: createServiceDto.carId,
      mechanicId: createServiceDto.mechanicId,
      serviceEstimatedDeliveryDate:
        createServiceDto.serviceEstimatedDeliveryDate,
      description: createServiceDto.description,
      serviceHasParts: [],
      status: createServiceDto.status,
    };

    for (const partData of createServiceDto.parts) {
      const parts = await this.partRepository.findOne({
        where: { id: partData.partId },
      });
      let serviceHasParts: ServiceHasParts = {
        id: uuidv4(),
        qtd: partData.qtd,
        unitPrice: parts.unitPrice,
        partsId: partData.partId,
        servicesId: serviceData.id,
        parts: parts,
      };
      const newQtd = parts.qtd - serviceHasParts.qtd;
      parts.qtd = newQtd;
      if (parts.qtd < 0) {
        throw new Error('No parts available');
      }
      await this.partRepository.save(parts);
      serviceData.serviceHasParts.push(serviceHasParts);
    }

    const savedService = await this.serviceRepository.save(serviceData);

    let totalPrice = 0;
    savedService.serviceHasParts.forEach((part) => {
      totalPrice += part.qtd * part.unitPrice;
    });

    return {
      serviceId: savedService.id,
      clientId: savedService.clientId,
      carId: savedService.carId,
      mechanicId: savedService.mechanicId,
      serviceEstimatedDeliveryDate: savedService.serviceEstimatedDeliveryDate,
      description: savedService.description,
      parts: savedService.serviceHasParts.map((parts) => ({
        partId: parts.partsId,
        title: parts.parts.title,
        description: parts.parts.description,
        qtd: parts.qtd,
        unitPrice: parts.unitPrice,
      })),
      totalPrice: totalPrice,
      status: savedService.status,
    };
  }

  async findAll(queryParams: FindAllServiceQueryParams) {
    const { offset, limit } = queryParams;

    const offsetInt = parseInt(offset);
    const limitInt = parseInt(limit);

    let where = {};
    if (queryParams.id) {
      where = {
        ...where,
        id: queryParams.id,
      };
    }

    if (queryParams.clientId) {
      where = {
        ...where,
        clientId: queryParams.clientId,
      };
    }

    if (queryParams.carId) {
      where = {
        ...where,
        carId: queryParams.carId,
      };
    }

    if (queryParams.mechanicId) {
      where = {
        ...where,
        mechanicId: queryParams.mechanicId,
      };
    }

    if (queryParams.serviceDeliveryDate) {
      where = {
        ...where,
        serviceDeliveryDate: queryParams.serviceDeliveryDate,
      };
    }

    if (queryParams.status) {
      where = {
        ...where,
        status: queryParams.status,
      };
    }

    const findAllService = await this.serviceRepository.find({
      skip: offsetInt * limitInt,
      take: limitInt,
      where,
      relations: ['serviceHasParts', 'serviceHasParts.parts'],
    });

    return {
      limit: limitInt,
      offset: offsetInt,
      total: findAllService.length,
      items: findAllService.map((service) => ({
        serviceId: service.id,
        clientId: service.clientId,
        carId: service.carId,
        mechanicId: service.mechanicId,
        serviceEstimatedDeliveryDate: service.serviceEstimatedDeliveryDate,
        description: service.description,
        parts: service.serviceHasParts.map((parts) => ({
          partId: parts.id,
          title: parts.parts.title,
          description: parts.parts.description,
          qtd: parts.qtd,
          unitPrice: parts.unitPrice,
        })),
        totalPrice: this.sumTotalPrice(service.serviceHasParts),
        status: service.status,
      })),
    };
  }

  private sumTotalPrice(parts: ServiceHasParts[]) {
    let totalPrice = 0;
    parts.forEach((part) => {
      totalPrice += part.qtd * part.unitPrice;
    });

    return totalPrice;
  }

  async findOne(id: string) {
    const findById = await this.serviceRepository.findOne({
      where: { id: id },
      relations: ['serviceHasParts', 'serviceHasParts.parts'],
    });

    let totalPrice = 0;
    findById.serviceHasParts.forEach((part) => {
      totalPrice += part.qtd * part.unitPrice;
    });

    return {
      serviceId: findById.id,
      clientId: findById.clientId,
      carId: findById.carId,
      mechanicId: findById.mechanicId,
      serviceEstimatedDeliveryDate: findById.serviceEstimatedDeliveryDate,
      description: findById.description,
      parts: findById.serviceHasParts.map((parts) => ({
        partId: parts.partsId,
        title: parts.parts.title,
        description: parts.parts.description,
        qtd: parts.qtd,
        unitPrice: parts.unitPrice,
      })),
      totalPrice: totalPrice,
      status: findById.status,
    };
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const serviceData = await this.serviceRepository.findOne({
      where: { id },
    });

    return this.serviceRepository.save({
      ...serviceData,
      ...updateServiceDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
