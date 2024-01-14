import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity, UserService } from '../../services/index';
import { EntityType } from '@common';
import { BaseController } from './base.controller';
import { UserEntityDto } from './dto/user-entity.dto';
import { AuthenticatedRequest } from './guards/authenticated-request.interface';
import * as bcrypt from 'bcrypt';

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
    @InjectMapper('mapper') mapper: Mapper,
  ) {
    super(service, logger, mapper);
  }

  protected override async updateImplementation(
    entity: Partial<UserEntityDto>,
    id: string,
    req: AuthenticatedRequest,
  ) {
    let item = this.mapFromDto(entity);

    if (item.passwordHash) {
      const hashNewPassword = await this.hashPassword(item.passwordHash);

      item = { ...item, passwordHash: hashNewPassword };
    }

    const updatedItem = await this.service.update(
      req.user.id,
      id,
      item,
      undefined,
    );
    const dto: UserEntityDto = this.mapToDto(updatedItem);

    return dto;
  }

  protected async hashPassword(password: string) {
    return await bcrypt.hash(password, 11);
  }
}
