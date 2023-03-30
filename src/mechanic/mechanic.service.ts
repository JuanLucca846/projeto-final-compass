import { Injectable } from '@nestjs/common';
import { CreateMechanicDto } from './dto/create-mechanic.dto';
import { UpdateMechanicDto } from './dto/update-mechanic.dto';
import { Mechanic } from './entities/mechanic.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindAllMechanicQueryParams } from './dto/mechanic/findAllMechanicQueryParams.dto';

@Injectable()
export class MechanicService {
  constructor(
    @InjectRepository(Mechanic)
    private mechanicRepository: Repository<Mechanic>,
  ) {}

  async create(createMechanicDto: CreateMechanicDto) {
    let mechanicData: Mechanic = {
      id: undefined,
      name: createMechanicDto.name,
      cpf: createMechanicDto.cpf,
      birthday: createMechanicDto.birthday,
      phone: createMechanicDto.phone,
      email: createMechanicDto.email,
      password: createMechanicDto.password,
      specialities: createMechanicDto.specialities,
      hiringDate: createMechanicDto.hiringDate,
      serviceFee: createMechanicDto.serviceFee,
      status: createMechanicDto.status,
    };

    return this.mechanicRepository.save(mechanicData);
  }

  async findAll(queryParams: FindAllMechanicQueryParams): Promise<Mechanic[]> {
    const { offset, limit } = queryParams;

    const offsetInt = parseInt(offset);
    const limitInt = parseInt(limit);

    let where = {};
    if (queryParams.name) {
      where = {
        ...where,
        name: queryParams.name,
      };
    }

    if (queryParams.cpf) {
      where = {
        ...where,
        cpf: queryParams.cpf,
      };
    }

    if (queryParams.birthday) {
      where = {
        ...where,
        birthday: queryParams.birthday,
      };
    }

    if (queryParams.phone) {
      where = {
        ...where,
        phone: queryParams.phone,
      };
    }

    if (queryParams.email) {
      where = {
        ...where,
        email: queryParams.email,
      };
    }

    if (queryParams.hiringDate) {
      where = {
        ...where,
        hiringDate: queryParams.hiringDate,
      };
    }

    if (queryParams.serviceRate) {
      where = {
        ...where,
        serviceRate: queryParams.serviceRate,
      };
    }

    if (queryParams.status) {
      where = {
        ...where,
        status: queryParams.status,
      };
    }

    return this.mechanicRepository.find({
      skip: offsetInt * limitInt,
      take: limitInt,
      where,
    });
  }

  async findOne(id: string) {
    return this.mechanicRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: string, updateMechanicDto: UpdateMechanicDto) {
    const mechanicData = await this.mechanicRepository.findOne({
      where: { id },
    });

    return this.mechanicRepository.save({
      ...mechanicData,
      ...updateMechanicDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} mechanic`;
  }
}
