import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
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

  async create(createCarDto: CreateCarDto, id: string, license_plate: string) {
    const checkCar = await this.carRepository.findOne({
      where: { license_plate: license_plate },
    });

    if (!checkCar) {
      throw new ConflictException('Car with this license plate already exist');
    }

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

  async findOne(id: string) {
    const checkCar = await this.carRepository.findOne({ where: { id: id } });
    if (!checkCar) {
      throw new NotFoundException('Car not found');
    }

    return checkCar;
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const carData = await this.carRepository.findOne({
      where: { id },
    });

    if (!carData) {
      throw new NotFoundException('Can not find a car to update');
    }

    return this.carRepository.save({
      ...carData,
      ...updateCarDto,
    });
  }

  async remove(id: string) {
    const checkCar = await this.carRepository.findOne({ where: { id: id } });
    if (!checkCar) {
      throw new NotFoundException('Can not find a car to delete');
    }
    return this.carRepository.delete({ id: id });
  }
}
