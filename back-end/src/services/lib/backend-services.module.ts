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
import { PostEntity } from './entities/post.entity';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ArticleEntity,
      DictionaryEntity,
      HitEntity,
      PostEntity,
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
    PostService,
  ],

  exports: [
    UserService,
    StatusService,
    ArticleService,
    DictionaryService,
    HitService,
    PostService,
  ],
})
export class BackendServicesModule {}
