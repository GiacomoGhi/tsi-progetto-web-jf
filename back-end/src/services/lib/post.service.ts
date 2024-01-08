import { Repository } from 'typeorm';

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from './base.service';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService extends BaseService<PostEntity> {
  override findManyDefaultRelations: string[] = [
    'createdByUser',
    'lastModifiedByUser',
  ];
  constructor(
    @InjectRepository(PostEntity)
    repo: Repository<PostEntity>,
    logger: Logger,
  ) {
    super(repo, logger);
  }
}
