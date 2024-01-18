import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from './base.service';
import { ArticleEntity } from './entities/article.entity';
import { PagedResult } from './paged-result';

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
  async findNewsPaged(
    take: number,
    skip: number,
    filters?: { field: string; value: string }[],
    orderBy?: { [field: string]: 'asc' | 'desc' },
    join: string[] = [],
    overwriteJoin = false,
    manager: EntityManager = this.repository.manager,
  ): Promise<PagedResult<ArticleEntity>> {
    const relations = overwriteJoin
      ? join
      : [...this.findManyDefaultRelations, ...join];

    let queryBuilder = this.buildNewsQuerySelect(
      relations,
      orderBy,
      manager,
      filters,
    );

    // skip, take
    queryBuilder = queryBuilder.skip(skip).take(take);

    const queryResult = (await queryBuilder.getManyAndCount()) as [
      ArticleEntity[],
      number,
    ];

    const result = {
      items: queryResult[0],
      totalCount: queryResult[1],
    };

    return result;
  }

  protected buildNewsQuerySelect(
    join: string[],
    orderBy?: { [field: string]: 'asc' | 'desc' },
    manager = this.repository.manager,
    filters?: { field: string; value: string }[],
  ): SelectQueryBuilder<ArticleEntity> {
    const alias = this.repository.metadata.targetName;
    let queryBuilder = manager
      .createQueryBuilder<ArticleEntity>(
        this.repository.metadata.target,
        this.repository.metadata.targetName,
      )
      .select() as SelectQueryBuilder<ArticleEntity>;

    queryBuilder = this.setJoin(alias, join, queryBuilder);

    if (filters) {
      queryBuilder = this.setNewsFilters(alias, filters, queryBuilder);
    }

    return queryBuilder;
  }

  protected setNewsFilters(
    alias: string,
    filters: { field: string; value: string }[],
    queryBuilder: SelectQueryBuilder<any>,
  ) {
    queryBuilder.where(`"${alias}"."isNews" is true`);
    filters.forEach((filter, i) => {
      queryBuilder.andWhere(
        `"${alias}"."${filter.field}" like '%${filter.value}%'`,
        {
          value: filter.value,
        },
      );
    });
    return queryBuilder;
  }
}
