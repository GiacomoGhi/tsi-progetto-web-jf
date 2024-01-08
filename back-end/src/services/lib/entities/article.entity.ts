import { Column, Entity, ManyToOne } from 'typeorm';

import { AutoMap } from '@automapper/classes';

import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

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

  @AutoMap()
  @Column('text', { nullable: true })
  liked: number;

  @AutoMap()
  @Column('text', { nullable: true })
  inNews: boolean;

  @ManyToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @AutoMap(() => UserEntity)
  createdByUser?: UserEntity | null;

  @ManyToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @AutoMap(() => UserEntity)
  lastModifiedByUser?: UserEntity | null;
}
