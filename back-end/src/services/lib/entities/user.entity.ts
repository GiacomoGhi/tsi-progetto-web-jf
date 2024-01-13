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
  passwordHash!: string;

  @AutoMap()
  @Column('varchar')
  nickName!: string;

  @AutoMap()
  @Column('varchar')
  name!: string;

  @AutoMap()
  @Column('varchar')
  surname!: string;

  @AutoMap()
  @Column('numeric')
  role!: number;

  @ManyToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @AutoMap(() => UserEntity)
  createdByUser?: UserEntity | null;

  @ManyToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @AutoMap(() => UserEntity)
  lastModifiedByUser?: UserEntity | null;
}
