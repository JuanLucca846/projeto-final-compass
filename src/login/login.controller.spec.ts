import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtModule } from '@nestjs/jwt';
import { LoginDto } from './dto/create-login.dto';
import { TokenDto } from './dto/refresh-token.dto';
import { UpdateLoginDto } from './dto/update-login.dto';

const loginDto: LoginDto = {
  email: 'email@email.com',
  password: '123456789123',
};

const token = {
  token: 'string',
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

describe('LoginController', () => {
  let loginController: LoginController;
  let loginService: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.SECRET,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      controllers: [LoginController],
      providers: [
        {
          provide: LoginService,
          useValue: {
            validateClient: jest.fn().mockResolvedValue(token),
            validateMechanic: jest.fn().mockResolvedValue(token),
            updateClientPassword: jest
              .fn()
              .mockResolvedValue(updateClientPasswordResponse),
            updateMechanicPassword: jest
              .fn()
              .mockResolvedValue(updateMechanicPasswordResponse),
            refreshClientToken: jest.fn().mockResolvedValue,
            refreshMechanicToken: jest.fn().mockResolvedValue,
          },
        },
      ],
    }).compile();

    loginController = module.get<LoginController>(LoginController);
    loginService: module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(loginController).toBeDefined();
  });

  describe('validateClient', () => {
    it('should return a logged client successfully', async () => {
      const result = await loginController.validateClient(loginDto);

      expect(result.token).not.toBeNull();
      expect(typeof result).toEqual('object');
    });
  });

  describe('validateMechanic', () => {
    it('should return a logged mechanic successfully', async () => {
      const result = await loginController.validateClient(loginDto);

      expect(result.token).not.toBeNull();
      expect(typeof result).toEqual('object');
    });
  });

  describe('updateClientPassword', () => {
    it('should return update client successfully', async () => {
      const result = await loginController.updateClientPassword(loginDto);

      expect(result).toEqual(updateClientPasswordResponse);
      expect(typeof result).toEqual('object');
    });
  });

  describe('updateMechanicPassword', () => {
    it('should return update mechanic successfully', async () => {
      const result = await loginController.updateMechanicPassword(loginDto);

      expect(result).toEqual(updateMechanicPasswordResponse);
      expect(typeof result).toEqual('object');
    });
  });

  describe('refreshClientToken', () => {
    it('should return refresh client token successfully', async () => {
      const result = await loginController.refreshClientToken(tokenDto);

      expect(result.access_token).not.toBeNull();
      expect(typeof result).toEqual('function');
    });
  });

  describe('refreshMechanicToken', () => {
    it('should return refresh mechanic token successfully', async () => {
      const result = await loginController.refreshClientToken(tokenDto);

      expect(result.access_token).not.toBeNull();
      expect(typeof result).toEqual('function');
    });
  });
});
