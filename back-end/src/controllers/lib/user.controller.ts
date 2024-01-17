import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity, UserService } from '../../services/index';
import { EntityType } from '@common';
import { BaseController } from './base.controller';
import { UserEntityDto } from './dto/user-entity.dto';
import { AuthenticatedRequest } from './guards/authenticated-request.interface';
import * as bcrypt from 'bcrypt';
import { union } from 'lodash';

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

  protected override async getPagedImplementation(
    req: AuthenticatedRequest,
    body: {
      orderBy?: { [field: string]: 'asc' | 'desc' } | undefined;
      take: number;
      skip: number;
      join: string[];
      filters?: { field: string; value: string }[];
    },
  ) {
    const join = union(body.join || []);

    const res = await this.service.findPaged(
      body.take,
      body.skip,
      body.filters,
      body.orderBy,
      join,
      body.join != null, // se vengono passate esplicitamente delle relations, sovrascrivo quelle base
    );

    const dtos: UserEntityDto[] = [];
    for (const item of res.items) {
      const dto = this.mapToDto(item);

      dtos.push({ ...dto, passwordHash: '*****' });
    }

    return { ...res, items: dtos };
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

    return { ...dto, passwordHash: '*****' };
  }

  protected override async deleteImplementation(
    req: AuthenticatedRequest,
    id: string,
  ) {
    if (!id) {
      throw new BadRequestException(
        "Devi specificare un id come parametro dell'url",
      );
    }

    const userToDelete = await this.service.findOne(id);

    const deletedUser = {
      ...userToDelete,
      email: '********',
      passwordHash: '********',
      name: '********',
      surname: '********',
      active: false,
      role: 0,
    } as UserEntity;

    await this.service.update(req.user.id, id, deletedUser);
  }

  protected async hashPassword(password: string) {
    return await bcrypt.hash(password, 11);
  }
}
