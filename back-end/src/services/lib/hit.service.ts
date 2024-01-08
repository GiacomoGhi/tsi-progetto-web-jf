import { Repository } from 'typeorm';

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from './base.service';
import { HitEntity } from './entities/hit.entity';

@Injectable()
export class HitService extends BaseService<HitEntity> {
  override findManyDefaultRelations: string[] = [
    'createdByUser',
    'lastModifiedByUser',
  ];
  constructor(
    @InjectRepository(HitEntity)
    repo: Repository<HitEntity>,
    logger: Logger,
  ) {
    super(repo, logger);
  }
}
