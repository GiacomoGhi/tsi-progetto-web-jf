import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostEntity, ArticleService, PostService } from '../../services/index';
import { EntityType } from '@common';
import { BaseController } from './base.controller';
import { PostEntityDto } from './dto/post.entity.dto';

@Controller('Post')
@ApiTags('Post')
@EntityType(PostEntity, PostEntityDto)
export class PostController extends BaseController<
  PostEntity,
  PostService,
  PostEntityDto
> {
  constructor(
    service: PostService,
    logger: Logger,
    @InjectMapper('mapper') mapper: Mapper,
  ) {
    super(service, logger, mapper);
  }
}
