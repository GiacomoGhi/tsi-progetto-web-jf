import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Logger,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity, UserService } from '../../services/index';
import { EntityType, JwtAuthGuard } from '@common';
import { BaseController } from './base.controller';
import { UserEntityDto } from './dto/user-entity.dto';
import { AuthenticatedRequest } from './guards/authenticated-request.interface';
import * as bcrypt from 'bcrypt';
import { union } from 'lodash';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from '@interfaces';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Post('paged')
  @HttpCode(200)
  @ApiOperation({
    summary: 'get data paged',
    description: 'get data paged',
  })
  @ApiOkResponse({
    description: 'paged response',
    schema: {
      type: 'array',
      items: {
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          picture: { type: 'string' },
        },
      },
    },
  })
  @ApiHeader({
    name: 'x-client',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        join: {
          type: 'array',
          default: [],
          items: {
            type: 'string',
            default: '',
          },
        },
        orderBy: {
          type: 'object',
          default: {},
        },
        filters: {
          type: 'array',
          default: [],
        },
        take: { type: 'number', default: 20 },
        skip: { type: 'number', default: 0 },
      },
    },
  })
  override async getPaged(
    @Body()
    body: {
      orderBy?: { [field: string]: 'asc' | 'desc' };
      take: number;
      skip: number;
      join: string[];
      filters?: { field: string; value: string }[];
    },
    @Req()
    req: AuthenticatedRequest,
  ): Promise<any> {
    return await this.getPagedImplementation(req, body);
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

  protected async softDeleteImplementation(
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

    return await this.service.update(req.user.id, id, deletedUser);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Put('soft-delete/:id')
  async softDelete(
    @Param('id') id: string,
    @Req()
    req: AuthenticatedRequest,
  ) {
    return await this.softDeleteImplementation(req, id);
  }

  protected async hashPassword(password: string) {
    return await bcrypt.hash(password, 11);
  }
}
