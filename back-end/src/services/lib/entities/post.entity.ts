import { Column, Entity, ManyToOne } from 'typeorm';

import { AutoMap } from '@automapper/classes';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';
import { ArticleEntity } from './article.entity';

@Entity({
  name: 'post',
})
export class PostEntity extends BaseEntity {
  @AutoMap()
  @Column('varchar')
  description!: string;

  @AutoMap()
  @Column('varchar')
  author!: string;

  @AutoMap()
  @Column('varchar')
  articleId!: string;

  @ManyToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @AutoMap(() => UserEntity)
  createdByUser?: UserEntity | null;

  @ManyToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @AutoMap(() => UserEntity)
  lastModifiedByUser?: UserEntity | null;
}
