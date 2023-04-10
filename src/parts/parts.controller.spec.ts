import { Test, TestingModule } from '@nestjs/testing';
import { PartsController } from './parts.controller';
import { PartsService } from './parts.service';
import { JwtModule } from '@nestjs/jwt';
import { CreatePartDto } from './dto/create-part.dto';
import { Part } from './entities/part.entity';
import { FindAllPartQueryParams } from './dto/part/findAllPartQueryParams.dto';

const partDto: CreatePartDto = {
  title: 'test',
  description: 'Test',
  qtd: 10,
  unitPrice: 50,
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

const findAllQuery: FindAllPartQueryParams = {
  limit: '10',
  offset: '0',
  title: 'test',
  description: 'Test',
  qtd: 10,
  unitPrice: '50',
};

const partId = '1';

describe('PartsController', () => {
  let partsController: PartsController;
  let partsService: PartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.SECRET,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      controllers: [PartsController],
      providers: [
        {
          provide: PartsService,
          useValue: {
            create: jest.fn().mockResolvedValue(partEntity),
            findAll: jest.fn().mockResolvedValue(partEntityList),
            findOne: jest.fn().mockResolvedValue(partEntity),
            update: jest.fn().mockResolvedValue(partEntity),
          },
        },
      ],
    }).compile();

    partsController = module.get<PartsController>(PartsController);
    partsService = module.get<PartsService>(PartsService);
  });

  it('should be defined', () => {
    expect(partsController).toBeDefined();
  });

  describe('create', () => {
    it('should return a created part successfully', async () => {
      const result = await partsController.create(partDto);

      expect(result).toEqual(partEntity);
      expect(typeof result).toEqual('object');
      expect(partsService.create).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(partsService, 'create').mockRejectedValueOnce(new Error());

      expect(partsService.create(partDto)).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return a part list successfully', async () => {
      const result = await partsController.findAll(findAllQuery);

      expect(result).toEqual(partEntityList);
      expect(typeof result).toEqual('object');
      expect(partsService.findAll).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(partsService, 'findAll').mockRejectedValueOnce(new Error());

      expect(partsService.findAll(findAllQuery)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a part successfully', async () => {
      const result = await partsController.findOne(partId);

      expect(result).toEqual(partEntity);
      expect(typeof result).toEqual('object');
      expect(partsService.findOne).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(partsService, 'findOne').mockRejectedValueOnce(new Error());

      expect(partsService.findOne(partId)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a part successfully', async () => {
      const result = await partsController.update(partId, partDto);

      expect(result).toEqual(partEntity);
      expect(typeof result).toEqual('object');
      expect(partsService.update).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(partsService, 'update').mockRejectedValue(new Error());

      expect(partsService.update(partId, partDto)).rejects.toThrowError();
    });
  });
});
