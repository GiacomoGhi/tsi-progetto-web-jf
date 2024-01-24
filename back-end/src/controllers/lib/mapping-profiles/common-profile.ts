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
  ArticleEntity,
  DictionaryEntity,
  HitEntity,
  PostEntity,
  UserEntity,
} from '../../../services/index';

import { UserEntityDto } from '../dto/user-entity.dto';
import { ArticleEntityDto } from '../dto/article.entity.dto';
import { DictionaryEntityDto } from '../dto/dictionary.entity.dto';
import { HitEntityDto } from '../dto/hit.entity.dto';
import { PostEntityDto } from '../dto/post.entity.dto';

@Injectable()
export class CommonProfile extends AutomapperProfile {
  constructor(@InjectMapper('mapper') mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      //Application Users
      createMap(mapper, UserEntityDto, UserEntity);

      createMap(
        mapper,
        UserEntity,
        UserEntityDto,
        forMember(
          (t) => t.createdByUserEmail,
          mapFrom((s) => s.createdByUser?.email),
        ),
        forMember(
          (t) => t.lastModifiedByUserEmail,
          mapFrom((s) => s.lastModifiedByUser?.email),
        ),
      );

      //Application Topics
      createMap(mapper, ArticleEntityDto, ArticleEntity);

      createMap(
        mapper,
        ArticleEntity,
        ArticleEntityDto,
        forMember(
          (t) => t.createdByUserEmail,
          mapFrom((s) => s.createdByUser?.email),
        ),
        forMember(
          (t) => t.lastModifiedByUserEmail,
          mapFrom((s) => s.lastModifiedByUser?.email),
        ),
      );

      //Application Dictionary
      createMap(mapper, DictionaryEntityDto, DictionaryEntity);

      createMap(
        mapper,
        DictionaryEntity,
        DictionaryEntityDto,
        forMember(
          (t) => t.createdByUserEmail,
          mapFrom((s) => s.createdByUser?.email),
        ),
        forMember(
          (t) => t.lastModifiedByUserEmail,
          mapFrom((s) => s.lastModifiedByUser?.email),
        ),
      );

      //Application Hit Counter
      createMap(mapper, HitEntityDto, HitEntity);

      createMap(
        mapper,
        HitEntity,
        HitEntityDto,
        forMember(
          (t) => t.createdByUserEmail,
          mapFrom((s) => s.createdByUser?.email),
        ),
        forMember(
          (t) => t.lastModifiedByUserEmail,
          mapFrom((s) => s.lastModifiedByUser?.email),
        ),
      );

      //Application POST
      createMap(mapper, PostEntityDto, PostEntity);

      createMap(
        mapper,
        PostEntity,
        PostEntityDto,
        forMember(
          (t) => t.createdByUserEmail,
          mapFrom((s) => s.createdByUser?.email),
        ),
        forMember(
          (t) => t.lastModifiedByUserEmail,
          mapFrom((s) => s.lastModifiedByUser?.email),
        ),
        forMember(
          (t) => t.author,
          mapFrom((s) => s.createdByUser?.nickName),
        ),
      );
    };
  }
}
