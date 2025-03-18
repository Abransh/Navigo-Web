import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    
    userRepository = moduleFixture.get(getRepositoryToken(User));
    
    await app.init();
  });

  beforeEach(async () => {
    // Clear the user repository before each test
    await userRepository.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/register (POST)', () => {
    it('should register a new user and return access token', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          password: 'password123',
          role: 'tourist',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user).toHaveProperty('id');
          expect(res.body.user.email).toBe('test@example.com');
        });
    });

    it('should return 400 when email is already in use', async () => {
      // Create a user with the same email
      const hashedPassword = await bcrypt.hash('password123', 10);
      await userRepository.save({
        firstName: 'Existing',
        lastName: 'User',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'tourist',
      });

      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          password: 'password123',
          role: 'tourist',
        })
        .expect(400);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should return access token when credentials are valid', async () => {
      // Create a user
      const hashedPassword = await bcrypt.hash('password123', 10);
      await userRepository.save({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'tourist',
      });

      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('user');
        });
    });

    it('should return 401 when credentials are invalid', async () => {
      // Create a user
      const hashedPassword = await bcrypt.hash('password123', 10);
      await userRepository.save({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'tourist',
      });

      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrong-password',
        })
        .expect(401);
    });
  });
});