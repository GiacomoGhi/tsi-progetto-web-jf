import { EntityManager, FindManyOptions, FindOneOptions } from 'typeorm';

import { PagedResult } from './paged-result';

export interface BaseServiceInterface<T> {
  findPaged(
    take: number,
    skip: number,
    manager?: EntityManager,
  ): Promise<PagedResult<T>>;
  findAll(options?: FindManyOptions<T>, manager?: EntityManager): Promise<T[]>;
  findOne(
    id: string,
    manager?: EntityManager,
    options?: FindOneOptions<T>,
  ): Promise<T>;
  update(
    currentContextUserId: string,
    id: string,
    entity: T,
    manager?: EntityManager,
    options?: FindOneOptions<T>,
  ): Promise<T>;
  insert(
    currentContextUserId: string,
    entity: T,
    manager?: EntityManager,
  ): Promise<T>;
  delete(
    currentContextUserId: string,
    id: string,
    manager?: EntityManager,
    options?: FindOneOptions<T>,
  ): Promise<void>;
}
