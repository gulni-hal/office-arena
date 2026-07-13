import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    // NestJS Dependency Injection sistemini test için mock'luyoruz (taklit ediyoruz)
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { 
          provide: JwtService, 
          useValue: { signAsync: jest.fn() } 
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token for valid user data', async () => {
      // Arrange: Test verimizi hazırlıyoruz
      const mockUser = { id: 1, email: 'test@officearena.com' };
      
      // JwtService'in ne döneceğini taklit ediyoruz
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('mock_jwt_token_string');

      // Act: Henüz yazmadığımız login fonksiyonunu çağırıyoruz
      const result = await service.login(mockUser);

      // Assert: Beklentilerimizi doğruluyoruz
      expect(result).toHaveProperty('access_token');
      expect(result.access_token).toBe('mock_jwt_token_string');
      expect(jwtService.signAsync).toHaveBeenCalled();
    });
  });
});