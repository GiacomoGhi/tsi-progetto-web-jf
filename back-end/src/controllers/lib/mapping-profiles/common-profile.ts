import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import {
  UserEntity,
} from '../../../services/index';

import { UserEntityDto } from '../dto/user-entity.dto';

@Injectable()
export class CommonProfile extends AutomapperProfile {
  constructor(@InjectMapper('mapper') mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, UserEntityDto, UserEntity);

      createMap(
        mapper,
        UserEntity,
        UserEntityDto,
        forMember(
          (t) => t.createdByUserEmail,
          mapFrom((s) => s.createdByUser?.email)
        ),
        forMember(
          (t) => t.lastModifiedByUserEmail,
          mapFrom((s) => s.lastModifiedByUser?.email)
        )
      );
    };
  }
}
