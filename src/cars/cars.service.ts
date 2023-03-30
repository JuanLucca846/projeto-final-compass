import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllCarQueryParams } from './dto/car/findAllCarQueryParams.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  create(createCarDto: CreateCarDto, id: string) {
    const carData: Car = {
      ...createCarDto,
      id: undefined,
      client_id: id,
    };

    return this.carRepository.save(carData);
  }

  findAll(queryParams: FindAllCarQueryParams): Promise<Car[]> {
    const { offset, limit } = queryParams;

    const offsetInt = parseInt(offset);
    const limitInt = parseInt(limit);

    let where = {};
    if (queryParams.license_plate) {
      where = {
        ...where,
        license_plate: queryParams.license_plate,
      };
    }

    if (queryParams.model) {
      where = {
        ...where,
        model: queryParams.model,
      };
    }

    if (queryParams.year) {
      where = {
        ...where,
        year: parseInt(queryParams.year),
      };
    }

    if (queryParams.manufacturer) {
      where = {
        ...where,
        manufacturer: queryParams.manufacturer,
      };
    }

    if (queryParams.color) {
      where = {
        ...where,
        color: queryParams.color,
      };
    }

    return this.carRepository.find({
      skip: offsetInt * limitInt,
      take: limitInt,
      where,
    });
  }

  findOne(id: string) {
    return this.carRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const carData = await this.carRepository.findOne({
      where: { id },
    });

    return this.carRepository.save({
      ...carData,
      ...updateCarDto,
    });
  }

  remove(id: string) {
    return this.carRepository.delete({ id: id });
  }
}
