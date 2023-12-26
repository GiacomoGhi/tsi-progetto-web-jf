import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  UserEntity,
  UserService,
} from '../../services/index';
import { EntityType } from '@common';
import { BaseController } from './base.controller';
import { UserEntityDto } from './dto/user-entity.dto';

@Controller('user')
@ApiTags('user')
@EntityType(UserEntity, UserEntityDto)
export class UserController extends BaseController<
  UserEntity,
  UserService,
  UserEntityDto
> {
  constructor(
    service: UserService,
    logger: Logger,
    @InjectMapper('mapper') mapper: Mapper
  ) {
    super(service, logger, mapper);
  }
}
