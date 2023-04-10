import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { FindAllClientQueryParams } from './dto/client/findAllClientQueryParams.dto';

const findAllQuery: FindAllClientQueryParams = {
  limit: '10',
  offset: '0',
  name: 'Test',
  cpf_cnpj: '123',
  client_type: 'PF',
  birthday: new Date(),
  phone: '(95) 98343-7116',
  email: 'john.doe@email.com',
  zipCode: '00000-000',
  street: 'Test Street',
  number: '1A',
  neighbourhood: 'Test',
  city: 'SP',
};

const clientDto: CreateClientDto = {
  name: 'Test',
  cpf_cnpj: '123',
  client_type: 'PF',
  birthday: new Date(),
  phone: '(95) 98343-7116',
  email: 'john.doe@email.com',
  password: '123456789123',
  zipCode: '00000-000',
  street: 'Test Street',
  number: '1A',
  neighbourhood: 'Test',
  city: 'SP',
};

const clientEntity: Client = {
  id: '1',
  name: 'Test',
  cpf_cnpj: '123',
  client_type: 'PF',
  birthday: new Date(),
  phone: '(95) 98343-7116',
  email: 'john.doe@email.com',
  password: '123456789123',
  zipCode: '00000-000',
  street: 'Test Street',
  number: '1A',
  neighbourhood: 'Test',
  city: 'SP',
};

const clientEntityList: Client[] = [
  new Client({
    id: '1',
    name: 'Test',
    cpf_cnpj: '123',
    client_type: 'PF',
    birthday: new Date(),
    phone: '(95) 98343-7116',
    email: 'johndoe@email.com',
    password: '',
    zipCode: '00000000',
    street: 'Test Street',
    number: '1A',
    neighbourhood: 'Test',
    city: 'SP',
  }),
  new Client({
    id: '2',
    name: 'Teste',
    cpf_cnpj: '1234',
    client_type: 'PJ',
    birthday: new Date(),
    phone: '(95) 98343-7117',
    email: 'johndoee@email.com',
    password: '1234567891234',
    zipCode: '00000001',
    street: 'Teste Street',
    number: '1B',
    neighbourhood: 'Testee',
    city: 'RJ',
  }),
  new Client({
    id: '3',
    name: 'Testee',
    cpf_cnpj: '12345',
    client_type: 'PJ',
    birthday: new Date(),
    phone: '(95) 98343-7118',
    email: 'johndoeee@email.com',
    password: '12345678912345',
    zipCode: '00000002',
    street: 'Testee Street',
    number: '1C',
    neighbourhood: 'Testeee',
    city: 'SP',
  }),
];

const clientId = '1';

const responseFindAll = {
  limit: 10,
  offset: 0,
  total: 3,
  items: [
    {
      id: '1',
      name: 'Test',
      cpf_cnpj: '123',
      client_type: 'PF',
      birthday: new Date(),
      phone: '(95) 98343-7116',
      email: 'johndoe@email.com',
      zipCode: '00000000',
      street: 'Test Street',
      number: '1A',
      neighbourhood: 'Test',
      city: 'SP',
    },
    {
      id: '2',
      name: 'Teste',
      cpf_cnpj: '1234',
      client_type: 'PJ',
      birthday: new Date(),
      phone: '(95) 98343-7117',
      email: 'johndoee@email.com',
      zipCode: '00000001',
      street: 'Teste Street',
      number: '1B',
      neighbourhood: 'Testee',
      city: 'RJ',
    },
    {
      id: '3',
      name: 'Testee',
      cpf_cnpj: '12345',
      client_type: 'PJ',
      birthday: new Date(),
      phone: '(95) 98343-7118',
      email: 'johndoeee@email.com',
      zipCode: '00000002',
      street: 'Testee Street',
      number: '1C',
      neighbourhood: 'Testeee',
      city: 'SP',
    },
  ],
};

describe('ClientService', () => {
  let clientService: ClientService;
  let clientRepository: Repository<Client>;
  let createClientService: ClientService;
  let createClientRepository: Repository<Client>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(Client),
          useValue: {
            create: jest.fn().mockReturnValue(clientEntity),
            save: jest.fn().mockResolvedValue(clientEntity),
            findAll: jest.fn().mockResolvedValue(clientEntityList),
            find: jest.fn().mockResolvedValue(clientEntityList),
            findOne: jest.fn().mockResolvedValue(clientEntityList[0]),
            findOneEmpty: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    const createClientModule: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(Client),
          useValue: {
            save: jest.fn().mockResolvedValue(clientEntity),
            findOne: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    clientService = module.get<ClientService>(ClientService);
    clientRepository = module.get<Repository<Client>>(
      getRepositoryToken(Client),
    );

    createClientService = createClientModule.get<ClientService>(ClientService);
    createClientRepository = createClientModule.get<Repository<Client>>(
      getRepositoryToken(Client),
    );
  });

  it('should be defined', () => {
    expect(clientService).toBeDefined();
    expect(clientRepository).toBeDefined();
  });

  describe('create', () => {
    it('should return a created client successfully', async () => {
      const result = await createClientService.create(clientDto);

      expect(result).toEqual(clientEntity);
      expect(createClientRepository.findOne).toHaveBeenCalledTimes(1);
      expect(createClientRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a car successfully', async () => {
      const result = await clientService.findOne(clientId);

      expect(result).toEqual(clientEntityList[0]);
      expect(clientRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest
        .spyOn(clientRepository, 'findOne')
        .mockRejectedValueOnce(new Error());
    });
  });

  describe('findAll', () => {
    it('should return a car list successfully', async () => {
      const result = await clientService.findAll(findAllQuery);

      expect(result).toEqual(responseFindAll);
      expect(clientRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(clientRepository, 'find').mockRejectedValueOnce(new Error());
    });
  });

  describe('update', () => {
    it('should update a car successfully', async () => {
      const result = await clientService.update(clientId, clientDto);

      expect(result).toEqual(clientEntity);
      expect(clientRepository.findOne).toHaveBeenCalledTimes(1);
      expect(clientRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw ', () => {
      jest
        .spyOn(clientRepository, 'findOne')
        .mockRejectedValueOnce(new Error());
      jest.spyOn(clientRepository, 'save').mockRejectedValueOnce(new Error());
    });
  });
});
