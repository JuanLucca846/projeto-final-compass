import { Test, TestingModule } from '@nestjs/testing';
import { PartsService } from './parts.service';
import { Repository } from 'typeorm';
import { Part } from './entities/part.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindAllPartQueryParams } from './dto/part/findAllPartQueryParams.dto';
import { CreatePartDto } from './dto/create-part.dto';

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

const responseFindAll = {
  items: [
    {
      description: 'Test',
      partId: '1',
      qtd: 10,
      title: 'test',
      unitPrice: 50,
    },
    {
      description: 'Teste',
      partId: '2',
      qtd: 20,
      title: 'teste',
      unitPrice: 60,
    },
    {
      description: 'Testee',
      partId: '3',
      qtd: 30,
      title: 'testee',
      unitPrice: 70,
    },
  ],
  limit: 10,
  offset: 0,
  total: 3,
};

describe('PartsService', () => {
  let partsService: PartsService;
  let partsRepository: Repository<Part>;
  let createPartsService: PartsService;
  let createPartsRepository: Repository<Part>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PartsService,
        {
          provide: getRepositoryToken(Part),
          useValue: {
            create: jest.fn().mockReturnValue(partEntity),
            save: jest.fn().mockResolvedValue(partEntity),
            findAll: jest.fn().mockResolvedValue(partEntityList),
            find: jest.fn().mockResolvedValue(partEntityList),
            findOne: jest.fn().mockResolvedValue(partEntityList[0]),
            findOneEmpty: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    const createMechanicModule: TestingModule = await Test.createTestingModule({
      providers: [
        PartsService,
        {
          provide: getRepositoryToken(Part),
          useValue: {
            save: jest.fn().mockResolvedValue(partEntity),
            findOne: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    partsService = module.get<PartsService>(PartsService);
    partsRepository = module.get<Repository<Part>>(getRepositoryToken(Part));

    createPartsService = createMechanicModule.get<PartsService>(PartsService);
    createPartsRepository = createMechanicModule.get<Repository<Part>>(
      getRepositoryToken(Part),
    );
  });

  it('should be defined', () => {
    expect(partsService).toBeDefined();
    expect(partsRepository).toBeDefined();
  });

  describe('create', () => {
    it('should return a created part successfully', async () => {
      const result = await createPartsService.create(partDto);

      expect(result).toEqual(partEntity);
    });
  });

  describe('findOne', () => {
    it('should return a part successfully', async () => {
      const result = await partsService.findOne(partId);

      expect(result).toEqual(partEntityList[0]);
      expect(partsRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(partsRepository, 'findOne').mockRejectedValueOnce(new Error());
    });
  });

  describe('findAll', () => {
    it('should return a part list successfully', async () => {
      const result = await partsService.findAll(findAllQuery);

      expect(result).toEqual(responseFindAll);
      expect(partsRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(partsRepository, 'find').mockRejectedValueOnce(new Error());
    });
  });

  describe('update', () => {
    it('should update a part successfully', async () => {
      const result = await partsService.update(partId, partDto);

      expect(result).toEqual(partEntity);
      expect(partsRepository.findOne).toHaveBeenCalledTimes(1);
      expect(partsRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw a exception', () => {
      jest.spyOn(partsRepository, 'findOne').mockRejectedValueOnce(new Error());
      jest.spyOn(partsRepository, 'save').mockRejectedValueOnce(new Error());
    });
  });
});
