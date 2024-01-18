import { AutoMap } from '@automapper/classes';
import { BaseEntityDto } from './base.entity.dto';
import { ApiProperty } from '@nestjs/swagger';

export class DictionaryEntityDto extends BaseEntityDto {
  @ApiProperty()
  @AutoMap()
  listKey!: string;

  @ApiProperty()
  @AutoMap()
  listValue!: string;

  @AutoMap()
  createdByUserId?: string;

  @AutoMap()
  lastModifiedByUserId?: string;

  createdByUserEmail?: string;

  lastModifiedByUserEmail?: string;
}
