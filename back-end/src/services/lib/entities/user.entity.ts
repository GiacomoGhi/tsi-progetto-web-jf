import { Column, Entity, ManyToOne } from 'typeorm';

import { AutoMap } from '@automapper/classes';

import { BaseEntity } from './base.entity';

@Entity({
  name: 'user',
})
export class UserEntity extends BaseEntity {
  @AutoMap()
  @Column('varchar')
  email!: string;

  @AutoMap()
  @Column('varchar')
  name!: string;

  @AutoMap()
  @Column('boolean')
  surname!: boolean;

  @AutoMap()
  @Column('varchar', { nullable: true })
  profession: string | null;

  @ManyToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @AutoMap(() => UserEntity)
  createdByUser?: UserEntity | null;

  @ManyToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @AutoMap(() => UserEntity)
  lastModifiedByUser?: UserEntity | null;
}
