import { AutoMap } from '@automapper/classes';
import { BaseEntityDto } from './base.entity.dto';
import { ApiProperty } from '@nestjs/swagger';

export class HitEntityDto extends BaseEntityDto {
  @ApiProperty()
  @AutoMap()
  topic: string;

  @ApiProperty()
  @AutoMap()
  author: string;

  @AutoMap()
  createdByUserId?: string;

  @AutoMap()
  lastModifiedByUserId?: string;

  createdByUserEmail?: string;

  lastModifiedByUserEmail?: string;
}
