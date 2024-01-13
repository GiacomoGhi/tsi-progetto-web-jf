import { AutoMap } from '@automapper/classes';
import { BaseEntityDto } from './base.entity.dto';
import { ApiProperty } from '@nestjs/swagger';
export class UserEntityDto extends BaseEntityDto {
  @ApiProperty()
  @AutoMap()
  email?: string;

  @ApiProperty()
  @AutoMap()
  nickName!: string;

  @ApiProperty()
  @AutoMap()
  name?: string;

  @ApiProperty()
  @AutoMap()
  surname?: string;

  @ApiProperty()
  @AutoMap()
  role?: number;

  @AutoMap()
  createdByUserId?: string;

  @AutoMap()
  lastModifiedByUserId?: string;

  createdByUserEmail?: string;

  lastModifiedByUserEmail?: string;
}
