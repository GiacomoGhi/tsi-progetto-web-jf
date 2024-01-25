import { AutoMap } from '@automapper/classes';
import { BaseEntityDto } from './base.entity.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PostEntityDto extends BaseEntityDto {
  @ApiProperty()
  @AutoMap()
  description?: string;

  @ApiProperty()
  @AutoMap()
  articleId?: string;

  @AutoMap()
  createdByUserId?: string;

  @AutoMap()
  lastModifiedByUserId?: string;

  author?: string;

  createdByUserEmail?: string;

  lastModifiedByUserEmail?: string;
}
