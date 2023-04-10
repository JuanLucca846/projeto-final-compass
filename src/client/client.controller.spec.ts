import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { JwtModule } from '@nestjs/jwt';
import { FindAllClientQueryParams } from './dto/client/findAllClientQueryParams.dto';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';

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

const clientId = '1';

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
    password: '123456789123',
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

describe('ClientController', () => {
  let clientController: ClientController;
  let clientService: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.SECRET,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      controllers: [ClientController],
      providers: [
        {
          provide: ClientService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(clientEntityList),
            create: jest.fn().mockResolvedValue(clientEntity),
            findOne: jest.fn().mockResolvedValue(clientEntity),
            update: jest.fn().mockResolvedValue(clientEntity),
          },
        },
      ],
    }).compile();

    clientController = module.get<ClientController>(ClientController);
    clientService = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(clientController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a client list successfully', async () => {
      const result = await clientController.findAll(findAllQuery);

      expect(result).toEqual(clientEntityList);
      expect(typeof result).toEqual('object');
      expect(clientService.findAll).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(clientService, 'findAll').mockRejectedValueOnce(new Error());

      expect(clientService.findAll(findAllQuery)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should return a created client successfully', async () => {
      const result = await clientController.create(clientDto);

      expect(result).toEqual(clientEntity);
      expect(typeof result).toEqual('object');
      expect(clientService.create).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(clientService, 'create').mockRejectedValueOnce(new Error());

      expect(clientService.create(clientDto)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a user successfully', async () => {
      const result = await clientController.findOne(clientId);

      expect(result).toEqual(clientEntity);
      expect(typeof result).toEqual('object');
      expect(clientService.findOne).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(clientService, 'findOne').mockRejectedValueOnce(new Error());

      expect(clientService.findOne(clientId)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      const result = await clientController.update(clientId, clientDto);

      expect(result).toEqual(clientEntity);
      expect(typeof result).toEqual('object');
      expect(clientService.update).toHaveBeenCalledTimes(1);
    });

    it('throw an exception', () => {
      jest.spyOn(clientService, 'update').mockRejectedValue(new Error());

      expect(clientService.update(clientId, clientDto)).rejects.toThrowError();
    });
  });
});
