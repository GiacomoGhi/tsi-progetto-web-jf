import { Column, Entity, ManyToOne } from 'typeorm';

import { AutoMap } from '@automapper/classes';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'user',
})
export class HitEntity extends BaseEntity {
  @AutoMap()
  @Column('varchar')
  topic!: string;

  @AutoMap()
  @Column('varchar')
  author!: string;

  @ManyToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @AutoMap(() => UserEntity)
  createdByUser?: UserEntity | null;

  @ManyToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @AutoMap(() => UserEntity)
  lastModifiedByUser?: UserEntity | null;
}
