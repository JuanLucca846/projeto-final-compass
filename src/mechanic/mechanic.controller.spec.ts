import { Test, TestingModule } from '@nestjs/testing';
import { MechanicController } from './mechanic.controller';
import { MechanicService } from './mechanic.service';
import { JwtModule } from '@nestjs/jwt';
import { CreateMechanicDto } from './dto/create-mechanic.dto';
import { Mechanic } from './entities/mechanic.entity';
import { FindAllMechanicQueryParams } from './dto/mechanic/findAllMechanicQueryParams.dto';

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

describe('MechanicController', () => {
  let mechanicController: MechanicController;
  let mechanicService: MechanicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.SECRET,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      controllers: [MechanicController],
      providers: [
        {
          provide: MechanicService,
          useValue: {
            create: jest.fn().mockResolvedValue(mechanicEntity),
            findAll: jest.fn().mockResolvedValue(mechanicEntityList),
            findOne: jest.fn().mockResolvedValue(mechanicEntity),
            update: jest.fn().mockResolvedValue(mechanicEntity),
          },
        },
      ],
    }).compile();

    mechanicController = module.get<MechanicController>(MechanicController);
    mechanicService = module.get<MechanicService>(MechanicService);
  });

  it('should be defined', () => {
    expect(mechanicController).toBeDefined();
  });

  describe('create', () => {
    it('should return a created mechanic successfully', async () => {
      const result = await mechanicController.create(mechanicDto);

      expect(result).toEqual(mechanicEntity);
      expect(typeof result).toEqual('object');
      expect(mechanicService.create).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(mechanicService, 'create').mockRejectedValueOnce(new Error());

      expect(mechanicService.create(mechanicDto)).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return a mechanic list successfully', async () => {
      const result = await mechanicController.findAll(findAllQuery);

      expect(result).toEqual(mechanicEntityList);
      expect(typeof result).toEqual('object');
      expect(mechanicService.findAll).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(mechanicService, 'findAll').mockRejectedValueOnce(new Error());

      expect(mechanicService.findAll(findAllQuery)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a mechanic successfully', async () => {
      const result = await mechanicController.findOne(mechanicId);

      expect(result).toEqual(mechanicEntity);
      expect(typeof result).toEqual('object');
      expect(mechanicService.findOne).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(mechanicService, 'findOne').mockRejectedValueOnce(new Error());

      expect(mechanicService.findOne(mechanicId)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a mechanic successfully', async () => {
      const result = await mechanicController.update(mechanicId, mechanicDto);

      expect(result).toEqual(mechanicEntity);
      expect(typeof result).toEqual('object');
      expect(mechanicService.update).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(mechanicService, 'update').mockRejectedValue(new Error());

      expect(
        mechanicService.update(mechanicId, mechanicDto),
      ).rejects.toThrowError();
    });
  });
});
