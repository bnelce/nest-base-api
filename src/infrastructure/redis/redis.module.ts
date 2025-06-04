import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        store: redisStore,
        host: config.get<string>('REDIS_HOST'),
        port: config.get<number>('REDIS_PORT'),
        ttl: config.get<number>('REDIS_TTL') || 60, // 60 seconds
      }),
      isGlobal: true,
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}
