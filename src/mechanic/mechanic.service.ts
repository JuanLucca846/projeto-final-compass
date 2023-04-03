import { Injectable, ConflictException } from '@nestjs/common';
import { CreateMechanicDto } from './dto/create-mechanic.dto';
import { UpdateMechanicDto } from './dto/update-mechanic.dto';
import { Mechanic } from './entities/mechanic.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindAllMechanicQueryParams } from './dto/mechanic/findAllMechanicQueryParams.dto';
import * as bcrypt from 'bcrypt';

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
      password: await bcrypt.hash(createMechanicDto.password, 10),
      specialities: createMechanicDto.specialities,
      hiringDate: createMechanicDto.hiringDate,
      serviceFee: parseInt(createMechanicDto.serviceFee),
      status: createMechanicDto.status,
    };

    const checkEmail = await this.mechanicRepository.findOne({
      where: { email: createMechanicDto.email },
    });

    if (checkEmail) {
      throw new ConflictException('Email already exist');
    }

    let saveMechanic = await this.mechanicRepository.save({
      ...mechanicData,
    });

    saveMechanic.password = '';

    return saveMechanic;
  }

  async findAll(queryParams: FindAllMechanicQueryParams) {
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

    if (queryParams.serviceFee) {
      where = {
        ...where,
        serviceFee: parseInt(queryParams.serviceFee.toString()),
      };
    }

    if (queryParams.status) {
      where = {
        ...where,
        status: queryParams.status,
      };
    }

    const findAllMechanic = await this.mechanicRepository.find({
      skip: offsetInt * limitInt,
      take: limitInt,
      where,
    });

    return {
      limit: limitInt,
      offset: offsetInt,
      total: findAllMechanic.length,
      items: findAllMechanic.map((mechanic) => ({
        id: mechanic.id,
        name: mechanic.name,
        cpf: mechanic.cpf,
        birthday: mechanic.birthday,
        phone: mechanic.phone,
        email: mechanic.email,
        specialties: mechanic.specialities,
        hiringDate: mechanic.hiringDate,
        serviceFee: mechanic.serviceFee,
        status: mechanic.status,
      })),
    };
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
      serviceFee: parseInt(updateMechanicDto.serviceFee),
    });
  }
}
