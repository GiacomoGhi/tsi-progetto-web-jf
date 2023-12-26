import { Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

import { AutoMap } from '@automapper/classes';

export abstract class BaseEntity {
  @AutoMap()
  @PrimaryColumn('uuid')
  id!: string;

  @AutoMap()
  @CreateDateColumn({ nullable: true })
  createdAt?: string;

  @AutoMap()
  @CreateDateColumn({ nullable: true })
  lastModifiedAt?: string;

  @AutoMap()
  @Column('uuid', { nullable: true })
  createdByUserId?: string;

  @AutoMap()
  @Column('uuid', { nullable: true })
  lastModifiedByUserId?: string;

  @AutoMap()
  @Column('bool', { nullable: true })
  active?: boolean;
}
