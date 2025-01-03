import { Module, Global } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';

@Global()
@Module({
  imports: [
    NestCacheModule.register({
      ttl: 60 * 5, 
    }),
  ],
  exports: [NestCacheModule],
})
export class CacheModule {}

