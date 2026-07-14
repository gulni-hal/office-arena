import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('leaderboard')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  // Liderlik tablosuna skor ekleme ucu
  @Post('score')
  async addScore(@Body() body: { gameId: string; userId: string; score: number }) {
    await this.redisService.addScore(body.gameId, body.userId, body.score);
    return { success: true, message: 'Skor başarıyla eklendi!' };
  }

  // Belirli bir oyunun liderlik tablosunu çekme ucu
  @Get(':gameId')
  async getLeaderboard(
    @Param('gameId') gameId: string, 
    @Query('limit') limit: string
  ) {
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    const topPlayers = await this.redisService.getTopPlayers(gameId, parsedLimit);
    return { gameId, leaderboard: topPlayers };
  }

  // Spesifik bir kullanıcının kaçıncı sırada olduğunu bulma ucu
  @Get(':gameId/rank/:userId')
  async getUserRank(
    @Param('gameId') gameId: string, 
    @Param('userId') userId: string
  ) {
    const rank = await this.redisService.getUserRank(gameId, userId);
    return { userId, rank };
  }
}