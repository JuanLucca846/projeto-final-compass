import { Test, TestingModule } from '@nestjs/testing';
import { MechanicService } from './mechanic.service';
import { Repository } from 'typeorm';
import { Mechanic } from './entities/mechanic.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindAllMechanicQueryParams } from './dto/mechanic/findAllMechanicQueryParams.dto';
import { CreateMechanicDto } from './dto/create-mechanic.dto';

const mechanicDto: CreateMechanicDto = {
  name: 'Test',
  cpf: '123',
  birthday: new Date(),
  phone: '(95) 98343-7116',
  email: 'john.doe@email.com',
  password: '123456789123',
  hiringDate: new Date(),
  serviceFee: '10',
  status: 'active',
  specialities: [],
};

const mechanicEntity: Mechanic = {
  id: '1',
  name: 'Test',
  cpf: '123',
  birthday: new Date(),
  phone: '(95) 98343-7116',
  email: 'john.doe@email.com',
  password: '123456789123',
  hiringDate: new Date(),
  serviceFee: 10,
  status: 'active',
  specialities: [],
};

const mechanicEntityList: Mechanic[] = [
  new Mechanic({
    id: '1',
    name: 'Test',
    cpf: '123',
    birthday: new Date(),
    phone: '(95) 98343-7116',
    email: 'john.doe@email.com',
    password: '123456789123',
    hiringDate: new Date(),
    serviceFee: 10,
    status: 'active',
    specialities: [],
  }),
  new Mechanic({
    id: '2',
    name: 'Teste',
    cpf: '1234',
    birthday: new Date(),
    phone: '(95) 98343-7117',
    email: 'john.doee@email.com',
    password: '1234567891234',
    hiringDate: new Date(),
    serviceFee: 20,
    status: 'active',
    specialities: [],
  }),
  new Mechanic({
    id: '3',
    name: 'Testee',
    cpf: '12345',
    birthday: new Date(),
    phone: '(95) 98343-7118',
    email: 'john.doeee@email.com',
    password: '12345678912345',
    hiringDate: new Date(),
    serviceFee: 30,
    status: 'active',
    specialities: [],
  }),
];

const findAllQuery: FindAllMechanicQueryParams = {
  limit: '10',
  offset: '0',
  name: 'Test',
  cpf: '123',
  birthday: new Date(),
  phone: '(95) 98343-7116',
  email: 'john.doe@email.com',
  hiringDate: new Date(),
  serviceFee: '10',
  status: 'active',
};

const mechanicId = '1';

const responseFindAll = {
  limit: 10,
  offset: 0,
  total: 3,
  items: [
    {
      id: '1',
      name: 'Test',
      cpf: '123',
      birthday: new Date(),
      phone: '(95) 98343-7116',
      email: 'john.doe@email.com',
      hiringDate: new Date(),
      serviceFee: 10,
      status: 'active',
      specialities: [],
    },
    {
      id: '2',
      name: 'Teste',
      cpf: '1234',
      birthday: new Date(),
      phone: '(95) 98343-7117',
      email: 'john.doee@email.com',
      hiringDate: new Date(),
      serviceFee: 20,
      status: 'active',
      specialities: [],
    },
    {
      id: '3',
      name: 'Testee',
      cpf: '12345',
      birthday: new Date(),
      phone: '(95) 98343-7118',
      email: 'john.doeee@email.com',
      hiringDate: new Date(),
      serviceFee: 30,
      status: 'active',
      specialities: [],
    },
  ],
};

describe('MechanicService', () => {
  let mechanicService: MechanicService;
  let mechanicRepository: Repository<Mechanic>;
  let createMechanicService: MechanicService;
  let createMechanicRepository: Repository<Mechanic>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MechanicService,
        {
          provide: getRepositoryToken(Mechanic),
          useValue: {
            create: jest.fn().mockReturnValue(mechanicEntity),
            save: jest.fn().mockResolvedValue(mechanicEntity),
            findAll: jest.fn().mockResolvedValue(mechanicEntityList),
            find: jest.fn().mockResolvedValue(mechanicEntityList),
            findOne: jest.fn().mockResolvedValue(mechanicEntityList[0]),
            findOneEmpty: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    const createMechanicModule: TestingModule = await Test.createTestingModule({
      providers: [
        MechanicService,
        {
          provide: getRepositoryToken(Mechanic),
          useValue: {
            save: jest.fn().mockResolvedValue(mechanicEntity),
            findOne: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    mechanicService = module.get<MechanicService>(MechanicService);
    mechanicRepository = module.get<Repository<Mechanic>>(
      getRepositoryToken(Mechanic),
    );

    createMechanicService =
      createMechanicModule.get<MechanicService>(MechanicService);
    createMechanicRepository = createMechanicModule.get<Repository<Mechanic>>(
      getRepositoryToken(Mechanic),
    );
  });

  it('should be defined', () => {
    expect(mechanicService).toBeDefined();
    expect(mechanicRepository).toBeDefined();
  });

  describe('create', () => {
    it('should return a created client successfully', async () => {
      const result = await createMechanicService.create(mechanicDto);

      expect(result).toEqual(mechanicEntity);
      expect(createMechanicRepository.findOne).toHaveBeenCalledTimes(1);
      expect(createMechanicRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a mechanic successfully', async () => {
      const result = await mechanicService.findOne(mechanicId);

      expect(result).toEqual(mechanicEntityList[0]);
      expect(mechanicRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest
        .spyOn(mechanicRepository, 'findOne')
        .mockRejectedValueOnce(new Error());
    });
  });

  describe('findAll', () => {
    it('should return a mechanic list successfully', async () => {
      const result = await mechanicService.findAll(findAllQuery);

      expect(result).toEqual(responseFindAll);
      expect(mechanicRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(mechanicRepository, 'find').mockRejectedValueOnce(new Error());
    });
  });

  describe('update', () => {
    it('should update a mechanic successfully', async () => {
      const result = await mechanicService.update(mechanicId, mechanicDto);

      expect(result).toEqual(mechanicEntity);
      expect(mechanicRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mechanicRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw a exception', () => {
      jest
        .spyOn(mechanicRepository, 'findOne')
        .mockRejectedValueOnce(new Error());
      jest.spyOn(mechanicRepository, 'save').mockRejectedValueOnce(new Error());
    });
  });
});
