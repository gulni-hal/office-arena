import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // JwtService'i Dependency Injection ile içeri alıyoruz
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    // Token'ın içine gömeceğimiz veri (payload). 
    // 'sub' (subject) standart olarak kullanıcı ID'sini temsil eder.
    const payload = { email: user.email, sub: user.id };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}