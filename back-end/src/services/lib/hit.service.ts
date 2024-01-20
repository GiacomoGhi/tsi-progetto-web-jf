import { Repository, SelectQueryBuilder } from 'typeorm';

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

  protected override setFilters(
    alias: string,
    filters: { field: string; value: string }[],
    queryBuilder: SelectQueryBuilder<any>,
  ) {
    filters.forEach((filter, i) => {
      if (i === 0) {
        queryBuilder.where(`"${alias}"."${filter.field}" = '${filter.value}'`, {
          value: filter.value,
        });
      } else {
        queryBuilder.andWhere(
          `"${alias}"."${filter.field}" = '${filter.value}'`,
          {
            value: filter.value,
          },
        );
      }
    });
    return queryBuilder;
  }
}
