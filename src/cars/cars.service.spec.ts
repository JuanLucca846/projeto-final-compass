import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindAllCarQueryParams } from './dto/car/findAllCarQueryParams.dto';
import { CreateCarDto } from './dto/create-car.dto';

const carDto: CreateCarDto = {
  license_plate: '1234567',
  model: 'Test',
  year: 2023,
  manufacturer: 'John Doe',
  color: 'blue',
};

const findAllQuery: FindAllCarQueryParams = {
  limit: '10',
  offset: '0',
  license_plate: '123',
  model: 'Test',
  year: '2023',
  manufacturer: 'John Doe',
  color: 'blue',
};

const clientId = '1';
const carId = '1';

const carEntityList: Car[] = [
  new Car({
    id: '1',
    license_plate: '123',
    model: 'Test1',
    year: 2023,
    manufacturer: 'John Doe',
    color: 'blue',
    client_id: '5',
  }),
  new Car({
    id: '2',
    license_plate: '1234',
    model: 'Test2',
    year: 2024,
    manufacturer: 'John Doee',
    color: 'yellow',
    client_id: '6',
  }),
  new Car({
    id: '3',
    license_plate: '12345',
    model: 'Test3',
    year: 2025,
    manufacturer: 'John Doeee',
    color: 'green',
    client_id: '7',
  }),
];

const carEnitty: Car = {
  id: '50',
  license_plate: '1234567',
  model: 'Test1',
  year: 2023,
  manufacturer: 'John Doe',
  color: 'blue',
  client_id: '5',
};

const responseFindAll = {
  limit: 10,
  offset: 0,
  total: 3,
  items: [
    {
      id: '1',
      license_plate: '123',
      model: 'Test1',
      year: 2023,
      manufacturer: 'John Doe',
      color: 'blue',
    },
    {
      id: '2',
      license_plate: '1234',
      model: 'Test2',
      year: 2024,
      manufacturer: 'John Doee',
      color: 'yellow',
    },
    {
      id: '3',
      license_plate: '12345',
      model: 'Test3',
      year: 2025,
      manufacturer: 'John Doeee',
      color: 'green',
    },
  ],
};

describe('CarsService', () => {
  let carsService: CarsService;
  let carsRepository: Repository<Car>;
  let createCarsService: CarsService;
  let createCarsRepository: Repository<Car>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        {
          provide: getRepositoryToken(Car),
          useValue: {
            create: jest.fn().mockReturnValue(carEnitty),
            save: jest.fn().mockResolvedValue(carEnitty),
            findAll: jest.fn().mockResolvedValue(carEntityList),
            find: jest.fn().mockResolvedValue(carEntityList),
            findOne: jest.fn().mockResolvedValue(carEntityList[0]),
            findOneEmpty: jest.fn().mockResolvedValue(null),
            delete: jest.fn().mockResolvedValue('Car successfully removed'),
          },
        },
      ],
    }).compile();

    const createCarModule: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        {
          provide: getRepositoryToken(Car),
          useValue: {
            save: jest.fn().mockResolvedValue(carEnitty),
            findOne: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    carsService = module.get<CarsService>(CarsService);
    carsRepository = module.get<Repository<Car>>(getRepositoryToken(Car));

    createCarsService = createCarModule.get<CarsService>(CarsService);
    createCarsRepository = createCarModule.get<Repository<Car>>(
      getRepositoryToken(Car),
    );
  });

  it('should be defined', () => {
    expect(carsService).toBeDefined();
    expect(carsRepository).toBeDefined();
  });

  describe('create', () => {
    it('should return a created car successfully', async () => {
      const result = await createCarsService.create(carDto, clientId);

      expect(result).toEqual(carEnitty);
      expect(createCarsRepository.findOne).toHaveBeenCalledTimes(1);
      expect(createCarsRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw a exception', () => {
      jest
        .spyOn(createCarsRepository, 'findOne')
        .mockRejectedValueOnce(new Error());
      jest
        .spyOn(createCarsRepository, 'save')
        .mockRejectedValueOnce(new Error());
    });
  });

  describe('findOne', () => {
    it('should return a car successfully', async () => {
      const result = await carsService.findOne(clientId, carId);

      expect(result).toEqual(carEntityList[0]);
      expect(carsRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(carsRepository, 'findOne').mockRejectedValueOnce(new Error());
    });
  });

  describe('findAll', () => {
    it('should return a car list successfully', async () => {
      const result = await carsService.findAll(findAllQuery, clientId);

      expect(result).toEqual(responseFindAll);
      expect(carsRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(carsRepository, 'find').mockRejectedValueOnce(new Error());
    });
  });

  describe('update', () => {
    it('should update a car successfully', async () => {
      const result = await carsService.update(clientId, carId, carDto);

      expect(result).toEqual(carEnitty);
      expect(carsRepository.findOne).toHaveBeenCalledTimes(1);
      expect(carsRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw ', () => {
      jest.spyOn(carsRepository, 'findOne').mockRejectedValueOnce(new Error());
      jest.spyOn(carsRepository, 'save').mockRejectedValueOnce(new Error());
    });
  });

  describe('remove', () => {
    it('should remove a car successfully', async () => {
      const result = await carsService.remove(clientId, carId);

      expect(result).toEqual('Car successfully removed');
      expect(carsRepository.findOne).toHaveBeenCalledTimes(1);
      expect(carsRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw ', () => {
      jest.spyOn(carsRepository, 'findOne').mockRejectedValueOnce(new Error());
      jest.spyOn(carsRepository, 'delete').mockRejectedValueOnce(new Error());
    });
  });
});
