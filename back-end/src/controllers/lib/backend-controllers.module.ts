import { Logger, Module } from '@nestjs/common';
import { BackendServicesModule } from '../../services/lib/backend-services.module';

import { CommonProfile } from './mapping-profiles/common-profile';
import { UserController } from './user.controller';
import { ArticleController } from './article.controller';
import { DictionaryController } from './dictionary.controller';
import { HitController } from './hit.controller';
import { PostController } from './post.controller';

@Module({
  imports: [BackendServicesModule],
  controllers: [
    UserController,
    ArticleController,
    DictionaryController,
    HitController,
    PostController,
  ],
  providers: [Logger, CommonProfile],
  exports: [CommonProfile],
})
export class BackendControllersModule {}
