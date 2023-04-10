import { Test, TestingModule } from '@nestjs/testing';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { JwtModule } from '@nestjs/jwt';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './entities/service.entity';
import { FindAllServiceQueryParams } from './dto/service/findAllServiceQueryParams.dto';

const serviceDto: CreateServiceDto = {
  clientId: '1',
  carId: '2',
  mechanicId: '3',
  serviceEstimatedDeliveryDate: '10/11/2023',
  description: 'test',
  parts: [],
  status: 'open',
};

const serviceEntity: Service = {
  id: '1',
  clientId: '2',
  carId: '3',
  mechanicId: '4',
  serviceEstimatedDeliveryDate: '10/11/2023',
  description: 'test',
  status: 'open',
  serviceHasParts: [],
};

const serviceEntityList: Service[] = [
  new Service({
    id: '1',
    clientId: '2',
    carId: '3',
    mechanicId: '4',
    serviceEstimatedDeliveryDate: '10/11/2023',
    description: 'test',
    status: 'open',
    serviceHasParts: [],
  }),
  new Service({
    id: '5',
    clientId: '6',
    carId: '7',
    mechanicId: '8',
    serviceEstimatedDeliveryDate: '10/11/2024',
    description: 'teste',
    status: 'open',
    serviceHasParts: [],
  }),
  new Service({
    id: '9',
    clientId: '10',
    carId: '11',
    mechanicId: '12',
    serviceEstimatedDeliveryDate: '10/11/2025',
    description: 'testee',
    status: 'open',
    serviceHasParts: [],
  }),
];

const findAllQuery: FindAllServiceQueryParams = {
  limit: '10',
  offset: '0',
  id: '1',
  clientId: '2',
  carId: '3',
  mechanicId: '4',
  serviceDeliveryDate: '10/11/2023',
  status: 'open',
};

const serviceId = '1';

describe('ServiceController', () => {
  let serviceController: ServiceController;
  let serviceService: ServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.SECRET,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      controllers: [ServiceController],
      providers: [
        {
          provide: ServiceService,
          useValue: {
            create: jest.fn().mockResolvedValue(serviceEntity),
            findAll: jest.fn().mockResolvedValue(serviceEntityList),
            findOne: jest.fn().mockResolvedValue(serviceEntity),
            update: jest.fn().mockResolvedValue(serviceEntity),
          },
        },
      ],
    }).compile();

    serviceController = module.get<ServiceController>(ServiceController);
    serviceService = module.get<ServiceService>(ServiceService);
  });

  it('should be defined', () => {
    expect(serviceController).toBeDefined();
  });

  describe('create', () => {
    it('should return a service part successfully', async () => {
      const result = await serviceController.create(serviceDto);

      expect(result).toEqual(serviceEntity);
      expect(typeof result).toEqual('object');
      expect(serviceService.create).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(serviceService, 'create').mockRejectedValueOnce(new Error());

      expect(serviceService.create(serviceDto)).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return a part list successfully', async () => {
      const result = await serviceController.findAll(findAllQuery);

      expect(result).toEqual(serviceEntityList);
      expect(typeof result).toEqual('object');
      expect(serviceService.findAll).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(serviceService, 'findAll').mockRejectedValueOnce(new Error());

      expect(serviceService.findAll(findAllQuery)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a part successfully', async () => {
      const result = await serviceController.findOne(serviceId);

      expect(result).toEqual(serviceEntity);
      expect(typeof result).toEqual('object');
      expect(serviceService.findOne).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(serviceService, 'findOne').mockRejectedValueOnce(new Error());

      expect(serviceService.findOne(serviceId)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a part successfully', async () => {
      const result = await serviceController.update(serviceId, serviceDto);

      expect(result).toEqual(serviceEntity);
      expect(typeof result).toEqual('object');
      expect(serviceService.update).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(serviceService, 'update').mockRejectedValue(new Error());

      expect(
        serviceService.update(serviceId, serviceDto),
      ).rejects.toThrowError();
    });
  });
});
