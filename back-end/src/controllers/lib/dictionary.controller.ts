import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ArticleEntity,
  ArticleService,
  DictionaryEntity,
  DictionaryService,
} from '../../services/index';
import { EntityType } from '@common';
import { BaseController } from './base.controller';

import { DictionaryEntityDto } from './dto/dictionary.entity.dto';

@Controller('Article')
@ApiTags('Article')
@EntityType(DictionaryEntity, DictionaryEntityDto)
export class DictionaryController extends BaseController<
  DictionaryEntity,
  DictionaryService,
  DictionaryEntityDto
> {
  constructor(
    service: DictionaryService,
    logger: Logger,
    @InjectMapper('mapper') mapper: Mapper,
  ) {
    super(service, logger, mapper);
  }
}
