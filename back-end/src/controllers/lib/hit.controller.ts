import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ArticleEntity,
  ArticleService,
  HitEntity,
  HitService,
} from '../../services/index';
import { EntityType } from '@common';
import { BaseController } from './base.controller';

import { HitEntityDto } from './dto/hit.entity.dto';

@Controller('Article')
@ApiTags('Article')
@EntityType(HitEntity, HitEntityDto)
export class HitController extends BaseController<
  HitEntity,
  HitService,
  HitEntityDto
> {
  constructor(
    service: HitService,
    logger: Logger,
    @InjectMapper('mapper') mapper: Mapper,
  ) {
    super(service, logger, mapper);
  }
}
