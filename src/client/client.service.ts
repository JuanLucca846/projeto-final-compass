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

    const checkEmail = await this.clientRepository.findOne({
      where: { email: createClientDto.email },
    });

    if (checkEmail) {
      throw new ConflictException('Email already exist');
    }

    return this.clientRepository.save({
      ...clientData,
      ...createClientDto,
      password: '',
    });
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
    const clientData = await this.clientRepository.findOne({
      where: { id },
    });

    if (!clientData) {
      throw new NotFoundException('Client not found to update');
    }

    return this.clientRepository.save({
      ...clientData,
      ...updateClientDto,
      password: '',
    });
  }
}
