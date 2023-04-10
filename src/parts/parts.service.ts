import { Injectable } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { Part } from './entities/part.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindAllPartQueryParams } from './dto/part/findAllPartQueryParams.dto';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(Part)
    private partRepository: Repository<Part>,
  ) {}

  create(createPartDto: CreatePartDto) {
    let partData: Part = {
      id: undefined,
      title: createPartDto.title,
      description: createPartDto.description,
      qtd: createPartDto.qtd,
      unitPrice: createPartDto.unitPrice,
    };

    return this.partRepository.save(partData);
  }

  async findAll(queryParams: FindAllPartQueryParams) {
    const { offset, limit } = queryParams;

    const offsetInt = parseInt(offset);
    const limitInt = parseInt(limit);

    let where = {};
    if (queryParams.title) {
      where = {
        ...where,
        title: queryParams.title,
      };
    }

    if (queryParams.description) {
      where = {
        ...where,
        description: queryParams.description,
      };
    }

    if (queryParams.qtd) {
      where = {
        ...where,
        qtd: parseInt(queryParams.qtd.toString()),
      };
    }

    if (queryParams.unitPrice) {
      where = {
        ...where,
        unitPrice: queryParams.unitPrice,
      };
    }

    const findAllParts = await this.partRepository.find({
      skip: offsetInt * limitInt,
      take: limitInt,
      where,
    });

    return {
      limit: 10,
      offset: 0,
      total: findAllParts.length,
      items: findAllParts.map((parts) => ({
        partId: parts.id,
        title: parts.title,
        description: parts.description,
        qtd: parts.qtd,
        unitPrice: parts.unitPrice,
      })),
    };
  }

  findOne(id: string) {
    return this.partRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: string, updatePartDto: UpdatePartDto) {
    const partData = await this.partRepository.findOne({
      where: { id },
    });

    return this.partRepository.save({
      ...partData,
      ...updatePartDto,
    });
  }
}
