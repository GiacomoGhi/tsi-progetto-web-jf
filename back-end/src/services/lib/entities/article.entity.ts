import { Column, Entity, ManyToOne } from 'typeorm';

import { AutoMap } from '@automapper/classes';

import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({
  name: 'article',
})
export class ArticleEntity extends BaseEntity {
  @AutoMap()
  @Column('varchar')
  title!: string;

  @AutoMap()
  @Column('varchar')
  description!: string;

  @AutoMap()
  @Column('text', { nullable: true })
  image: string;

  @ManyToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @AutoMap(() => UserEntity)
  createdByUser?: UserEntity | null;

  @ManyToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @AutoMap(() => UserEntity)
  lastModifiedByUser?: UserEntity | null;
}
