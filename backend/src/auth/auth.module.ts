import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true, // Her modülde tekrar import etmemek için
      secret: 'office-arena-super-secret-key', // İleride bunu .env dosyasına alacağız
      signOptions: { expiresIn: '1d' }, // Token 1 gün sonra geçersiz olacak
    }),
  ],
  providers: [AuthService],
  exports: [AuthService], // Diğer modüllerin (örneğin users) AuthService'i kullanabilmesi için
})
export class AuthModule {}