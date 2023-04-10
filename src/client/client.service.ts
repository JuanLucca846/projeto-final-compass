import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { FindAllClientQueryParams } from './dto/client/findAllClientQueryParams.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const clientData: Client = {
      ...createClientDto,
      id: undefined,
      password: await bcrypt.hash(createClientDto.password, 10),
    };

    const checkEmail = await this.clientRepository.findOne({
      where: { email: createClientDto.email },
    });

    if (checkEmail) {
      throw new ConflictException('Email already exist');
    }

    let saveClient = await this.clientRepository.save({
      ...clientData,
    });

    saveClient.password = '';

    return saveClient;
  }

  async findAll(queryParams: FindAllClientQueryParams) {
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

    if (queryParams.cpf_cnpj) {
      where = {
        ...where,
        cpf_cnpj: queryParams.cpf_cnpj,
      };
    }

    if (queryParams.client_type) {
      where = {
        ...where,
        client_type: queryParams.client_type,
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

    if (queryParams.street) {
      where = {
        ...where,
        street: queryParams.street,
      };
    }

    if (queryParams.number) {
      where = {
        ...where,
        number: queryParams.number,
      };
    }

    if (queryParams.neighbourhood) {
      where = {
        ...where,
        neighbourhood: queryParams.neighbourhood,
      };
    }

    if (queryParams.city) {
      where = {
        ...where,
        city: queryParams.city,
      };
    }

    if (queryParams.zipCode) {
      where = {
        ...where,
        zipCode: queryParams.zipCode,
      };
    }

    const findAllClient = await this.clientRepository.find({
      skip: offsetInt * limitInt,
      take: limitInt,
      where,
      relations: ['cars'],
    });

    return {
      limit: limitInt,
      offset: offsetInt,
      total: findAllClient.length,
      items: findAllClient.map((client) => ({
        id: client.id,
        name: client.name,
        cpf_cnpj: client.cpf_cnpj,
        client_type: client.client_type,
        birthday: client.birthday,
        phone: client.phone,
        email: client.email,
        street: client.street,
        number: client.number,
        neighbourhood: client.neighbourhood,
        city: client.city,
        zipCode: client.zipCode,
        cars: client?.cars?.map((car) => ({
          license_plate: car.license_plate,
          model: car.model,
          year: car.year,
          manufacturer: car.manufacturer,
          color: car.color,
        })),
      })),
    };
  }

  async findOne(id: string): Promise<Client | null> {
    const findById = await this.clientRepository.findOne({
      where: { id: id },
    });
    if (!findById) {
      throw new NotFoundException('Client not found');
    }

    return {
      id: findById.id,
      name: findById.name,
      cpf_cnpj: findById.cpf_cnpj,
      client_type: findById.client_type,
      birthday: findById.birthday,
      phone: findById.phone,
      email: findById.email,
      password: '',
      zipCode: findById.zipCode,
      street: findById.street,
      number: findById.number,
      neighbourhood: findById.neighbourhood,
      city: findById.city,
    };
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const findClientData = await this.clientRepository.findOne({
      where: { id },
    });

    if (!findClientData) {
      throw new NotFoundException('Client not found to update');
    }

    let saveClient = await this.clientRepository.save({
      ...findClientData,
      ...updateClientDto,
      password: await bcrypt.hash(updateClientDto.password, 10),
    });

    saveClient.password = '';

    return saveClient;
  }
}
