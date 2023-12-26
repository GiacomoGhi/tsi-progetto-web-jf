import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntityDto {
  @AutoMap()
  @ApiProperty()
  id!: string;

  @AutoMap()
  @ApiProperty()
  active: boolean;

  @AutoMap()
  createdAt?: string;

  @AutoMap()
  lastModifiedAt?: string;
}
