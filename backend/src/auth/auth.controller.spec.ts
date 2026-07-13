import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        // Controller'ın ayağa kalkması için AuthService'in ihtiyaç duyduğu JwtService'i taklit ediyoruz
        //// deneme icin deneme icin
        {
          provide: JwtService,
          useValue: { signAsync: jest.fn() }, 
        },
      ],
    }).compile();

    controller = module.get(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});