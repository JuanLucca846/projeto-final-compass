import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { Repository } from 'typeorm';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Client } from '../client/entities/client.entity';
import { Mechanic } from '../mechanic/entities/mechanic.entity';
import { LoginDto } from './dto/create-login.dto';
import { TokenDto } from './dto/refresh-token.dto';
import { JwtModule, JwtService } from '@nestjs/jwt';

const loginDto: LoginDto = {
  email: 'email@email.com',
  password: '123456789123',
};

const token = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiVGVzdCIsImNwZl9jbnBqIjoiMTIzIiwiY2xpZW50X3R5cGUiOiJQRiIsImJpcnRoZGF5IjoiMjAyMy0wNC0xMFQwMDo0NjoyMS43NDdaIiwicGhvbmUiOiIoOTUpIDk4MzQzLTcxMTYiLCJlbWFpbCI6ImpvaG4uZG9lQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiIiwiemlwQ29kZSI6IjAwMDAwLTAwMCIsInN0cmVldCI6IlRlc3QgU3RyZWV0IiwibnVtYmVyIjoiMUEiLCJuZWlnaGJvdXJob29kIjoiVGVzdCIsImNpdHkiOiJTUCIsInJvbGUiOiJDTElFTlQiLCJpYXQiOjE2ODEwODc1ODIsImV4cCI6MTY4MTE3Mzk4Mn0.WYhRBvbdtVdBWAYRoV1fKm6Div0TmELqKikaHYjiQUY',
};

const tokenDto: TokenDto = {
  access_token: 'string',
};

const updateClientPasswordResponse = {
  id: '3c11cb80-d36c-11ed-875f-22165c0302a8',
  name: 'John Doe',
  cpf_cnpj: '704.631.340-79',
  client_type: 'PF',
  birthday: '1994-10-01T00:00:00.000Z',
  phone: '(95) 98343-7116',
  email: 'john.doe@provider.com',
  password: '',
  zipCode: '93950-000',
  street: 'Rua Oliveiras',
  number: '1A',
  neighbourhood: 'União',
  city: 'Porto Alegre',
};

const updateMechanicPasswordResponse = {
  id: '778225e8-d1d2-11ed-95bb-22165c0302a8',
  name: 'Test Doe',
  cpf: '704.631.340-79',
  birthday: '1994-01-01T02:00:00.000Z',
  phone: '(95) 98343-7116',
  email: 'john.doe@provider.com',
  password: '',
  hiringDate: '1994-01-01T02:00:00.000Z',
  serviceFee: 10,
  status: 'active',
  specialities: ['a', 'b', 'c'],
};

const clientEmail = 'john.doe@email.com';

const clientPassword = '123456789123';

const client: Client = {
  id: '1',
  name: 'Test',
  cpf_cnpj: '123',
  client_type: 'PF',
  birthday: new Date(),
  phone: '(95) 98343-7116',
  email: 'john.doe@email.com',
  password: '$2a$12$eiJgkOSm5788W0qqx9GLFuDc6MFyb0i/6dJtflNY.xP5xHuj3jgsS',
  zipCode: '00000-000',
  street: 'Test Street',
  number: '1A',
  neighbourhood: 'Test',
  city: 'SP',
};

const mechanicEmail = 'john.doe@email.com';

const mechanicPassword = '123456789123';

const mechanic: Mechanic = {
  id: '1',
  name: 'Test',
  cpf: '123',
  birthday: new Date(),
  phone: '(95) 98343-7116',
  email: 'john.doe@email.com',
  password: '$2a$12$yoyFpKg4YQ.Z2srkractYemNKWJzsouyxSgBik.2FcFylwqVjC6/i',
  hiringDate: new Date(),
  serviceFee: 10,
  status: 'active',
  specialities: [],
};

describe('LoginService', () => {
  let loginService: LoginService;
  let clientRepository: Repository<Client>;
  let mechanicRepository: Repository<Mechanic>;
  let createLoginService: LoginService;
  let createClientRepository: Repository<Client>;
  let createMechanicRepository: Repository<Mechanic>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'jfiodjiOHJFUSDIHFUSDIAOHFIONVOnfmdui',
          signOptions: { expiresIn: '1d' },
        }),
      ],
      providers: [
        LoginService,
        //JwtService,
        {
          provide: getRepositoryToken(Client),
          useValue: {
            findOne: jest.fn().mockResolvedValue(client),
          },
        },
        {
          provide: getRepositoryToken(Mechanic),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mechanic),
          },
        },
      ],
    }).compile();

    const validateModule: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'jfiodjiOHJFUSDIHFUSDIAOHFIONVOnfmdui',
          signOptions: { expiresIn: '1d' },
        }),
      ],
      providers: [
        LoginService,
        //JwtService,
        {
          provide: getRepositoryToken(Client),
          useValue: {
            findOne: jest.fn().mockResolvedValue(client),
          },
        },
        {
          provide: getRepositoryToken(Mechanic),
          useValue: {
            validateMechanic: jest.fn().mockResolvedValue(mechanic),
          },
        },
      ],
    }).compile();

    loginService = module.get<LoginService>(LoginService);
    clientRepository = module.get<Repository<Client>>(
      getRepositoryToken(Client),
    );
    mechanicRepository = module.get<Repository<Mechanic>>(
      getRepositoryToken(Mechanic),
    );
    createLoginService = module.get<LoginService>(LoginService);
    createClientRepository = module.get<Repository<Client>>(
      getRepositoryToken(Client),
    );
    createMechanicRepository = module.get<Repository<Mechanic>>(
      getRepositoryToken(Mechanic),
    );
  });

  it('should be defined', () => {
    expect(loginService).toBeDefined();
    expect(clientRepository).toBeDefined();
    expect(mechanicRepository).toBeDefined();
  });

  describe('validateClient', () => {
    it('should validate a client successfully', async () => {
      const result = await createLoginService.validateClient(
        clientEmail,
        clientPassword,
      );

      expect(result).not.toBeNull();
      expect(createClientRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('validateMechanic', () => {
    it('should validate a mechanic successfully', async () => {
      const result = await createLoginService.validateMechanic(
        mechanicEmail,
        mechanicPassword,
      );

      expect(result).not.toBeNull();
      expect(createMechanicRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
