import 'reflect-metadata';

export const ENTITY_TYPE_KEY = 'entityType';
export const EntityType = (entity: any, entityDto: any) => (target: any) =>
  Reflect.defineMetadata(ENTITY_TYPE_KEY, { entity, entityDto }, target);
