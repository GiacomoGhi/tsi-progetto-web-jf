import { AutoMap } from '@automapper/classes';
import { BaseEntityDto } from './base.entity.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleEntityDto extends BaseEntityDto {
  @ApiProperty()
  @AutoMap()
  title: string;

  @ApiProperty()
  @AutoMap()
  description?: string;

  @ApiProperty()
  @AutoMap()
  image?: Blob;

  @ApiProperty()
  @AutoMap()
  isNews?: boolean;

  @ApiProperty()
  @AutoMap()
  liked?: number;

  @AutoMap()
  createdByUserId?: string;

  @AutoMap()
  lastModifiedByUserId?: string;

  createdByUserEmail?: string;

  lastModifiedByUserEmail?: string;
}
