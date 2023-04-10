import { Test, TestingModule } from '@nestjs/testing';
import { ServiceService } from './service.service';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindAllServiceQueryParams } from './dto/service/findAllServiceQueryParams.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { PartsService } from '../parts/parts.service';
import { Part } from '../parts/entities/part.entity';

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

const responseFindAll = {
  limit: 10,
  offset: 0,
  total: 3,
  items: [
    {
      clientId: '2',
      carId: '3',
      mechanicId: '4',
      serviceEstimatedDeliveryDate: '10/11/2023',
      serviceId: '1',
      description: 'test',
      status: 'open',
      parts: [],
      totalPrice: 0,
    },
    {
      clientId: '6',
      carId: '7',
      mechanicId: '8',
      serviceEstimatedDeliveryDate: '10/11/2024',
      serviceId: '5',
      description: 'teste',
      status: 'open',
      parts: [],
      totalPrice: 0,
    },
    {
      clientId: '10',
      carId: '11',
      mechanicId: '12',
      serviceEstimatedDeliveryDate: '10/11/2025',
      serviceId: '9',
      description: 'testee',
      status: 'open',
      parts: [],
      totalPrice: 0,
    },
  ],
};

const responseFindOne = {
  carId: '3',
  clientId: '2',
  description: 'test',
  mechanicId: '4',
  parts: [],
  serviceEstimatedDeliveryDate: '10/11/2023',
  serviceId: '1',
  status: 'open',
  totalPrice: 0,
};

const responseCreate = {
  carId: '3',
  clientId: '2',
  description: 'test',
  mechanicId: '4',
  parts: [],
  serviceEstimatedDeliveryDate: '10/11/2023',
  serviceId: '1',
  status: 'open',
  totalPrice: 0,
};

const partEntity: Part = {
  id: '1',
  title: 'test',
  description: 'Test',
  qtd: 10,
  unitPrice: 50,
};

const partEntityList: Part[] = [
  new Part({
    id: '1',
    title: 'test',
    description: 'Test',
    qtd: 10,
    unitPrice: 50,
  }),
  new Part({
    id: '2',
    title: 'teste',
    description: 'Teste',
    qtd: 20,
    unitPrice: 60,
  }),
  new Part({
    id: '3',
    title: 'testee',
    description: 'Testee',
    qtd: 30,
    unitPrice: 70,
  }),
];

describe('ServiceService', () => {
  let serviceService: ServiceService;
  let serviceRepository: Repository<Service>;
  let createServiceService: ServiceService;
  let createServiceRepository: Repository<Service>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceService,
        PartsService,
        {
          provide: getRepositoryToken(Service),
          useValue: {
            create: jest.fn().mockReturnValue(serviceEntity),
            save: jest.fn().mockResolvedValue(serviceEntity),
            findAll: jest.fn().mockResolvedValue(serviceEntityList),
            find: jest.fn().mockResolvedValue(serviceEntityList),
            findOne: jest.fn().mockResolvedValue(serviceEntityList[0]),
            findOneEmpty: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: getRepositoryToken(Part),
          useValue: {
            save: jest.fn().mockResolvedValue(partEntity),
            findOne: jest.fn().mockResolvedValue(partEntityList[0]),
          },
        },
      ],
    }).compile();

    const createServiceModule: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceService,
        PartsService,
        {
          provide: getRepositoryToken(Service),
          useValue: {
            save: jest.fn().mockResolvedValue(serviceEntity),
            findOne: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: getRepositoryToken(Part),
          useValue: {
            save: jest.fn().mockResolvedValue(partEntity),
            findOne: jest.fn().mockResolvedValue(partEntityList[0]),
          },
        },
      ],
    }).compile();

    serviceService = module.get<ServiceService>(ServiceService);
    serviceRepository = module.get<Repository<Service>>(
      getRepositoryToken(Service),
    );

    createServiceService =
      createServiceModule.get<ServiceService>(ServiceService);
    createServiceRepository = createServiceModule.get<Repository<Service>>(
      getRepositoryToken(Service),
    );
  });

  it('should be defined', () => {
    expect(serviceService).toBeDefined();
    expect(serviceRepository).toBeDefined();
  });

  describe('create', () => {
    it('should return a created service successfully', async () => {
      const result = await createServiceService.create(serviceDto);

      expect(result).toEqual(responseCreate);
    });
  });

  describe('findOne', () => {
    it('should return a service successfully', async () => {
      const result = await serviceService.findOne(serviceId);

      expect(result).toEqual(responseFindOne);
      expect(serviceRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest
        .spyOn(serviceRepository, 'findOne')
        .mockRejectedValueOnce(new Error());
    });
  });

  describe('findAll', () => {
    it('should return a service list successfully', async () => {
      const result = await serviceService.findAll(findAllQuery);

      expect(result).toEqual(responseFindAll);
      expect(serviceRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(serviceRepository, 'find').mockRejectedValueOnce(new Error());
    });
  });

  describe('update', () => {
    it('should update a service successfully', async () => {
      const result = await serviceService.update(serviceId, serviceDto);

      expect(result).toEqual(serviceEntity);
      expect(serviceRepository.findOne).toHaveBeenCalledTimes(1);
      expect(serviceRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw a exception', () => {
      jest
        .spyOn(serviceRepository, 'findOne')
        .mockRejectedValueOnce(new Error());
      jest.spyOn(serviceRepository, 'save').mockRejectedValueOnce(new Error());
    });
  });
});
