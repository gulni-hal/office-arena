import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Bu sayede her modülde tekrar import etmemize gerek kalmaz
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}