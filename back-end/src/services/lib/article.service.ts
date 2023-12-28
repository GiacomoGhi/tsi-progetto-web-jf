import { Repository } from 'typeorm';

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from './base.service';
import { ArticleEntity } from './entities/article.entity';

@Injectable()
export class ArticleService extends BaseService<ArticleEntity> {
  override findManyDefaultRelations: string[] = [
    'createdByUser',
    'lastModifiedByUser',
  ];
  constructor(
    @InjectRepository(ArticleEntity)
    repo: Repository<ArticleEntity>,
    logger: Logger,
  ) {
    super(repo, logger);
  }
}
