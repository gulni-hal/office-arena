import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis;

  onModuleInit() {
    // Docker'da ayağa kaldırdığımız Redis'e bağlanıyoruz
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  onModuleDestroy() {
    this.redisClient.disconnect();
  }

  // ZADD: Oyuncunun skorunu ekler veya günceller
  async addScore(gameId: string, userId: string, score: number) {
    const key = `leaderboard:game:${gameId}`;
    // Redis Sorted Set mantığı: Skor ve Üye
    await this.redisClient.zadd(key, score, userId);
  }

  // ZREVRANGE: En yüksek skordan en düşüğe doğru ilk N oyuncuyu getirir
  async getTopPlayers(gameId: string, limit: number = 10) {
    const key = `leaderboard:game:${gameId}`;
    // WITHSCORES parametresi sayesinde hem kullanıcı ID'sini hem de skorunu alırız
    const result = await this.redisClient.zrevrange(key, 0, limit - 1, 'WITHSCORES');
    
    // Redis'ten gelen ["user42", "250", "user10", "150"] şeklindeki düz diziyi objeye çeviriyoruz
    // ESKİ HALİ: 
// const leaderboard = [];

// YENİ HALİ:
    const leaderboard: { userId: string; score: number }[] = [];
    for (let i = 0; i < result.length; i += 2) {
      leaderboard.push({
        userId: result[i],
        score: parseInt(result[i + 1], 10),
      });
    }
    return leaderboard;
  }

  // ZREVRANK: Oyuncunun liderlik tablosundaki kaçıncı sırada olduğunu bulur
  async getUserRank(gameId: string, userId: string) {
    const key = `leaderboard:game:${gameId}`;
    const rank = await this.redisClient.zrevrank(key, userId);
    
    // Redis sıralamaya 0'dan başlar, insani okuma için 1 ekliyoruz
    return rank !== null ? rank + 1 : null;
  }
}