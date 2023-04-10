import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { JwtModule } from '@nestjs/jwt';
import { FindAllCarQueryParams } from './dto/car/findAllCarQueryParams.dto';

const carDto: CreateCarDto = {
  license_plate: '123',
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

const carEntity: Car = {
  id: '1',
  license_plate: '123',
  model: 'Test',
  year: 2023,
  manufacturer: 'John Doe',
  color: 'blue',
  client_id: '5',
};

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

describe('CarsController', () => {
  let carsController: CarsController;
  let carsService: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.SECRET,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      controllers: [CarsController],
      providers: [
        {
          provide: CarsService,
          useValue: {
            create: jest.fn().mockResolvedValue(carEntity),
            findAll: jest.fn().mockResolvedValue(carEntityList),
            findOne: jest.fn().mockResolvedValue(carEntity),
            update: jest.fn().mockResolvedValue(carEntity),
            remove: jest.fn().mockResolvedValue('Car successfully removed'),
          },
        },
      ],
    }).compile();

    carsController = module.get<CarsController>(CarsController);
    carsService = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(carsController).toBeDefined();
  });

  describe('create', () => {
    it('should return a created car successfully', async () => {
      const result = await carsController.create(carDto, clientId);

      expect(result).toEqual(carEntity);
      expect(typeof result).toEqual('object');
      expect(carsService.create).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(carsService, 'create').mockRejectedValueOnce(new Error());

      expect(carsController.create(carDto, clientId)).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return a car list successfully', async () => {
      const result = await carsController.findAll(findAllQuery, clientId);

      expect(result).toEqual(carEntityList);
      expect(typeof result).toEqual('object');
      expect(carsService.findAll).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(carsService, 'findAll').mockRejectedValueOnce(new Error());

      expect(
        carsController.findAll(findAllQuery, clientId),
      ).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a car successfully', async () => {
      const result = await carsController.findOne(clientId, carId);

      expect(result).toEqual(carEntity);
      expect(typeof result).toEqual('object');
      expect(carsService.findOne).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(carsService, 'findOne').mockRejectedValueOnce(new Error());

      expect(carsController.findOne(clientId, carId)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a car successfully', async () => {
      const result = await carsController.update(clientId, carId, carDto);

      expect(result).toEqual(carEntity);
      expect(typeof result).toEqual('object');
      expect(carsService.update).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(carsService, 'update').mockRejectedValueOnce(new Error());

      expect(
        carsController.update(clientId, carId, carDto),
      ).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a car successfully', async () => {
      const result = await carsController.remove(clientId, carId);

      expect(result).toEqual('Car successfully removed');
      expect(typeof result).toEqual('string');
      expect(carsService.remove).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(carsService, 'remove').mockRejectedValue(new Error());

      expect(carsController.remove(clientId, carId)).rejects.toThrowError();
    });
  });
});
