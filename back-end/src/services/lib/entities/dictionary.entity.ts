import { Column, Entity, ManyToOne } from 'typeorm';

import { AutoMap } from '@automapper/classes';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'user',
})
export class DictionaryEntity extends BaseEntity {
  @AutoMap()
  @Column('varchar')
  listKey!: string;

  @AutoMap()
  @Column('varchar')
  listValue!: string;

  @ManyToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @AutoMap(() => UserEntity)
  createdByUser?: UserEntity | null;

  @ManyToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @AutoMap(() => UserEntity)
  lastModifiedByUser?: UserEntity | null;
}
