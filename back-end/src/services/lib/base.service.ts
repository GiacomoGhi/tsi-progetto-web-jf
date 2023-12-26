import * as momentNs from 'moment';
import {
  Brackets,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  FindOptionsRelationByString,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { BaseServiceInterface } from './base.service.interface';
import { BaseEntity } from './entities/base.entity';
import { PagedResult } from './paged-result';

@Injectable()
export abstract class BaseService<T extends BaseEntity>
  implements BaseServiceInterface<T>
{
  findManyDefaultRelations: string[] = [];
  findOneDefaultRelations: string[] = [...this.findManyDefaultRelations];

  moment = momentNs;

  constructor(protected repository: Repository<T>, protected logger: Logger) {}

  async findPaged(
    take: number,
    skip: number,
    manager: EntityManager = this.repository.manager,
  ): Promise<PagedResult<T>> {
    let queryBuilder = manager.createQueryBuilder();

    // skip, take
    queryBuilder = queryBuilder.skip(skip).take(take);

    const queryResult = (await queryBuilder.getManyAndCount()) as [T[], number];

    const result = {
      items: queryResult[0],
      totalCount: queryResult[1],
    };

    return result;
  }

  async findAll(
    options?: FindManyOptions<T>,
    manager: EntityManager = this.repository.manager,
  ): Promise<T[]> {
    options = options || {};

    options.relations = options.relations || [];
    if (Array.isArray(options.relations)) {
      options.relations = [
        ...this.findOneDefaultRelations,
        ...(options.relations as FindOptionsRelationByString),
      ];
    }
    return manager.find(this.repository.metadata.target, options);
  }

  async findOne(
    id: string,
    manager: EntityManager = this.repository.manager,
    options?: FindOneOptions<T>,
  ): Promise<T> {
    let optsWhere: FindOptionsWhere<T> | FindOptionsWhere<T>[] | undefined;

    if (Array.isArray(options?.where)) {
      optsWhere = options?.where.map((opt) => {
        return { ...opt, id };
      });
    } else if (options?.where) {
      optsWhere = {
        ...options?.where,
        id,
      };
    } else {
      optsWhere = {
        id,
      } as FindOptionsWhere<T>;
    }

    options = options || {};
    options.relations = options.relations
      ? options.relations
      : [...this.findOneDefaultRelations];
    const opts = {
      ...options,
      where: optsWhere,
    } as FindOneOptions<T>;

    const res = await manager.findOne(this.repository.metadata.target, opts);

    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  async findOneByCondition(
    options: FindOneOptions<T>,
    manager: EntityManager = this.repository.manager,
  ): Promise<T> {
    options = options || {};
    options.relations = options.relations
      ? options.relations
      : [...this.findOneDefaultRelations];

    const res = await manager.findOne(this.repository.metadata.target, options);

    if (!res) {
      throw new NotFoundException(this.repository.metadata.targetName);
    }
    return res;
  }

  async update(
    currentContextUserId: string,
    id: string,
    entity: Partial<T>,
    manager: EntityManager = this.repository.manager,
    options?: FindOneOptions<T>,
  ): Promise<T> {
    const res = await this.findOne(id, manager, { ...options, relations: [] });

    const entityToUpdate = Object.assign(res, {
      ...entity,
      lastModifiedByUserId: currentContextUserId,
    });

    const response = await manager.update(
      this.repository.metadata.target,
      { id: id },
      entityToUpdate,
    );

    return await this.findOne(id, manager);
  }

  async insert(
    currentContextUserId: string,
    entity: Partial<T>,
    manager: EntityManager = this.repository.manager,
  ): Promise<T> {
    if (entity.id == null) {
      //TODO MARCOC
      //throw new BadRequestException();
      entity.id = uuidv4();
    }

    const entityToInsert = {
      //TODO MARCOC: sistemare campi obbligatori/etc
      ...entity,
      createdByUserId: currentContextUserId,
    };
    const response = await manager.save(
      this.repository.metadata.target,
      entityToInsert,
    );

    return await this.findOne(response.id as string, manager);
  }

  async insertWithId(
    currentContextUserId: string,
    entity: Partial<T>,
    manager: EntityManager = this.repository.manager,
  ): Promise<T> {
    if (!entity.id) {
      throw new BadRequestException();
    }
    const entityToInsert = {
      createdUserId: currentContextUserId,
      ...entity,
    };
    const response = await manager.save(
      this.repository.metadata.target,
      entityToInsert,
    );
    return await this.findOne(response.id as string, manager);
  }

  async delete(
    currentContextUserId: string,
    id: string,
    manager: EntityManager = this.repository.manager,
    options?: FindOneOptions<T>,
  ) {
    const res = await this.findOne(id, manager, options);

    try {
      await manager.remove(this.repository.metadata.target, res);
    } catch (error: any) {
      throw new BadRequestException(error, 'Delete Error');
    }
  }

  protected addJoin(
    builder: SelectQueryBuilder<T>,
    path: string,
    rootEntity: string,
    joinedEntities: string[],
  ) {
    const completePath = `${rootEntity}.${path}`;
    const splittedPath = completePath.split('.');

    for (let i = 0; i < splittedPath.length - 1; i++) {
      const parent = splittedPath[i];
      const entity = splittedPath[i + 1];
      if (joinedEntities.indexOf(entity) === -1) {
        builder = builder.leftJoinAndSelect(`${parent}.${entity}`, entity);
        joinedEntities.push(entity);
      }
    }

    return builder;
  }

  protected setJoin(
    rootEntity: string,
    join: string[],
    queryBuilder: SelectQueryBuilder<T>,
  ): SelectQueryBuilder<T> {
    const joined: string[] = [];
    join.forEach((entity) => {
      queryBuilder = this.addJoin(queryBuilder, entity, rootEntity, joined);
    });
    return queryBuilder;
  }

  protected setOrderBy(
    alias: string,
    orderBy: { [field: string]: 'asc' | 'desc' },
    queryBuilder: SelectQueryBuilder<any>,
  ): SelectQueryBuilder<any> {
    const orderFields = orderBy;
    Object.keys(orderFields).forEach((key: string, i: number) => {
      const orderDirection = (<any>orderFields)[key].toUpperCase() as
        | 'ASC'
        | 'DESC';

      let field: string;

      if (key.indexOf('.') < 0) {
        field = `${alias}.${key}`;
      } else {
        const splitted = key.split('.');

        const root = splitted[splitted.length - 2];

        field = `${root}.${splitted[splitted.length - 1]}`;

        if (
          this.repository.metadata.allEmbeddeds.find(
            (emb) => emb.propertyName === root,
          ) != null
        ) {
          field = `${alias}.${field}`;
        }
      }

      if (i > 0) {
        queryBuilder = queryBuilder.addOrderBy(field, orderDirection);
      } else {
        queryBuilder = queryBuilder.orderBy(field, orderDirection);
      }
    });
    return queryBuilder;
  }
}
