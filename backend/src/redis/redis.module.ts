import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';

@Global()
@Module({
  controllers: [RedisController], // Controller'ı buraya ekledik
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}