import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'test-token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user object when credentials are valid', async () => {
      const user = {
        id: 'test-id',
        email: 'test@example.com',
        password: await bcrypt.hash('test-password', 10),
      };
      
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      
      const result = await service.validateUser('test@example.com', 'test-password');
      
      expect(result).toEqual({
        id: user.id,
        email: user.email,
      });
    });

    it('should return null when credentials are invalid', async () => {
      const user = {
        id: 'test-id',
        email: 'test@example.com',
        password: await bcrypt.hash('test-password', 10),
      };
      
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      
      const result = await


      const result = await service.validateUser('test@example.com', 'wrong-password');
      
      expect(result).toBeNull();
    });

    it('should return null when user does not exist', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
      
      const result = await service.validateUser('nonexistent@example.com', 'test-password');
      
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token and user when credentials are valid', async () => {
      const user = {
        id: 'test-id',
        email: 'test@example.com',
        role: 'tourist',
      };
      
      jest.spyOn(service, 'validateUser').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue('test-token');
      
      const result = await service.login({ email: 'test@example.com', password: 'test-password' });
      
      expect(result).toEqual({
        access_token: 'test-token',
        user,
      });
      expect(jwtService.sign).toHaveBeenCalledWith({ 
        email: user.email, 
        sub: user.id, 
        role: user.role 
      });
    });
  });
});