import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackendConfigModule, BackendConfigService } from '@config';

import { UserEntity } from './entities/user.entity';
import { ArticleEntity } from './entities/article.entity';
import { UserService } from './user.service';
import { StatusService } from './status.service';
import { ArticleService } from './article.service';
import { DictionaryEntity } from './entities/dictionary.entity';
import { DictionaryService } from './dictionary.service';
import { HitEntity } from './entities/hit.entity';
import { HitService } from './hit.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ArticleEntity,
      DictionaryEntity,
      HitEntity,
    ]),
    BackendConfigModule,
    // BackendClientsModule,
  ],

  providers: [
    Logger,
    UserService,
    StatusService,
    ArticleService,
    DictionaryService,
    HitService,
  ],

  exports: [
    UserService,
    StatusService,
    ArticleService,
    DictionaryService,
    HitService,
  ],
})
export class BackendServicesModule {}
