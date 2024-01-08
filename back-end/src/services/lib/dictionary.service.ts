import { Repository } from 'typeorm';

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from './base.service';
import { DictionaryEntity } from './entities/dictionary.entity';

@Injectable()
export class DictionaryService extends BaseService<DictionaryEntity> {
  override findManyDefaultRelations: string[] = [
    'createdByUser',
    'lastModifiedByUser',
  ];
  constructor(
    @InjectRepository(DictionaryEntity)
    repo: Repository<DictionaryEntity>,
    logger: Logger,
  ) {
    super(repo, logger);
  }
}
