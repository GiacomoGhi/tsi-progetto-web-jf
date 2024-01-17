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
  @Column({ type: 'bytea', nullable: true })
  image: Buffer;

  @AutoMap()
  @Column('text', { nullable: true })
  isNews: boolean;

  @ManyToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @AutoMap(() => UserEntity)
  createdByUser?: UserEntity | null;

  @ManyToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @AutoMap(() => UserEntity)
  lastModifiedByUser?: UserEntity | null;
}
