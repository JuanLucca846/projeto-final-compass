import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { FindAllClientQueryParams } from './dto/client/findAllClientQueryParams.dto';

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
    };

    return this.clientRepository.save(clientData);
  }

  findAll(queryParams: FindAllClientQueryParams): Promise<Client[]> {
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

    return this.clientRepository.find({
      skip: offsetInt * limitInt,
      take: limitInt,
      where,
    });
  }

  async findOne(id: string): Promise<Client | null> {
    return this.clientRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const clientData = await this.clientRepository.findOne({
      where: { id },
    });

    return this.clientRepository.save({
      ...clientData,
      ...updateClientDto,
    });
  }
}
