import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticleEntity, ArticleService } from '../../services/index';
import { EntityType } from '@common';
import { BaseController } from './base.controller';
import { ArticleEntityDto } from './dto/article.entity.dto';

@Controller('Article')
@ApiTags('Article')
@EntityType(ArticleEntity, ArticleEntityDto)
export class ArticleController extends BaseController<
  ArticleEntity,
  ArticleService,
  ArticleEntityDto
> {
  constructor(
    service: ArticleService,
    logger: Logger,
    @InjectMapper('mapper') mapper: Mapper,
  ) {
    super(service, logger, mapper);
  }
}
