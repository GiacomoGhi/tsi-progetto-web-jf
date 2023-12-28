import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackendConfigModule, BackendConfigService } from '@config';

import { UserEntity } from './entities/user.entity';
import { ArticleEntity } from './entities/article.entity';
import { UserService } from './user.service';
import { StatusService } from './status.service';
import { ArticleService } from './article.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ArticleEntity]),
    BackendConfigModule,
    // BackendClientsModule,
  ],

  providers: [Logger, UserService, StatusService, ArticleService],

  exports: [UserService, StatusService, ArticleService],
})
export class BackendServicesModule {}
