import { Mapper } from '@automapper/core';
import {
  BadRequestException,
  Body,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseUUIDPipe,
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
} from '@nestjs/swagger';
import { ENTITY_TYPE_KEY, JwtAuthGuard } from '@common';
import { BaseEntity, BaseService } from '../../services/index';
import {
  //   FilterOperator,
  //   FilterType,
  //   FilterValue,
  Role,
} from '@interfaces';

import { Roles } from './decorators/roles.decorator';
import { BaseEntityDto } from './dto/base.entity.dto';
import { AuthenticatedRequest } from './guards/authenticated-request.interface';
import { RolesGuard } from './guards/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseController<
  T extends BaseEntity,
  TService extends BaseService<T>,
  TDto extends BaseEntityDto,
> {
  protected entityType: any;
  protected entityDto: any;

  protected joinConfigurations = false;

  // protected getUserFilters(req: AuthenticatedRequest): {
  //   filters: FilterValue[];
  //   join: string[];
  // } {
  //   const filters: FilterValue[] = [];
  //   const join: string[] = [];

  //   if (req.headers['x-client'] === 'app') {
  //     filters.push({
  //       field: 'active',
  //       operator: FilterOperator.equals,
  //       type: FilterType.boolean,
  //       value: [true],
  //     });

  //     if (this.joinConfigurations) {
  //       join.push('configurations');

  //       filters.push({
  //         field: 'configurations.active',
  //         operator: FilterOperator.equals,
  //         type: FilterType.boolean,
  //         value: [true],
  //       });
  //     }
  //   }

  //   return {
  //     filters,
  //     join,
  //   };
  // }

  // protected getUserFiltersAsOptions(
  //   req: AuthenticatedRequest
  // ): FindManyOptions<T> {
  //   if (req.user.role === Role.User) {
  //     return {
  //       where: {
  //         active: true,
  //       },
  //     } as FindManyOptions<T>;
  //   }
  //   return {};
  // }

  constructor(
    protected service: TService,
    protected logger: Logger,
    protected mapper?: Mapper, //protected auditService: AuditService
  ) {
    const entityTypeMetadata = Reflect.getMetadata(
      ENTITY_TYPE_KEY,
      Object.getPrototypeOf(this).constructor,
    );
    if (!entityTypeMetadata)
      throw new Error('Entity type not set for ' + this.constructor.name);

    this.entityType = entityTypeMetadata.entity;
    this.entityDto = entityTypeMetadata.entityDto;
  }

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
        filters: {
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
        take: { type: 'number', default: 20 },
        skip: { type: 'number', default: 0 },
      },
    },
  })
  async getPaged(
    @Body()
    body: {
      // filters: FilterValue[];
      // orderBy?: { [field: string]: 'asc' | 'desc' };
      take: number;
      skip: number;
      // join: string[];
    },
    @Req()
    req: AuthenticatedRequest,
  ): Promise<any> {
    return await this.getPagedImplementation(req, body);
  }

  protected async getPagedImplementation(
    req: AuthenticatedRequest,
    body: {
      // filters: FilterValue[];
      // orderBy?: { [field: string]: 'asc' | 'desc' } | undefined;
      take: number;
      skip: number;
      // join: string[];
    },
  ) {
    // const userFilters = this.getUserFilters(req);

    // // user's filters + body filters that aren't defined into user's filters
    // const filters = [...userFilters.filters];
    // body.filters.forEach((bf) => {
    //   const filter = filters.find((f) => f.field === bf.field);
    //   if (!filter) {
    //     filters.push(bf);
    //   }
    // });

    // if (
    //   filters.some(
    //     (f) =>
    //       f.value.length === 0 &&
    //       f.operator !== FilterOperator.blankOrEmpty &&
    //       f.operator !== FilterOperator.notBlank &&
    //       f.operator !== FilterOperator.blank
    //   ) ||
    //   filters.some(
    //     (f) => f.value.length === 1 && f.operator === FilterOperator.inRange
    //   )
    // ) {
    //   throw new BadRequestException('Formato filtri non corretto');
    // }

    // const join = union(body.join || [], userFilters.join);

    const res = await this.service.findPaged(
      body.take,
      body.skip,
      // filters,
      // body.orderBy,
      // join,
      // body.join != null // se vengono passate esplicitamente delle relations, sovrascrivo quelle base
    );

    const dtos: TDto[] = [];
    for (const item of res.items) {
      const dto = this.mapToDto(item);

      dtos.push(dto);
    }

    return { ...res, items: dtos };
  }

  @Get(':id')
  async getSingle(
    @Param('id', ParseUUIDPipe) id: string,
    @Req()
    req: AuthenticatedRequest,
  ): Promise<TDto> {
    return await this.getSingleImplementation(req, id);
  }

  protected async getSingleImplementation(
    req: AuthenticatedRequest,
    id: string,
  ) {
    const item = await this.service.findOne(
      id,
      undefined,
      // this.getUserFiltersAsOptions(req)
    );

    const dto: TDto = this.mapToDto(item);

    return dto;
  }

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      additionalProperties: true,
    },
  })
  @Roles(Role.Admin)
  async create(
    @Body()
    entity: Partial<TDto>,
    @Req()
    req: AuthenticatedRequest,
  ): Promise<TDto> {
    return await this.createImplementation(entity, req);
  }

  protected async createImplementation(
    entity: Partial<TDto>,
    req: AuthenticatedRequest,
  ) {
    const item = this.mapFromDto(entity);

    this.logger.debug('req.user');
    this.logger.debug(req.user);

    const createdEntity = await this.service.insert(req.user.id, item);

    const dto: TDto = this.mapToDto(createdEntity);

    return dto;
  }

  @Put(':id')
  @ApiBody({
    schema: {
      type: 'object',
      additionalProperties: true,
    },
  })
  @Roles(Role.Admin)
  async update(
    @Body()
    entity: Partial<TDto>,
    @Param('id', ParseUUIDPipe) id: string,
    @Req()
    req: AuthenticatedRequest,
  ): Promise<TDto> {
    return await this.updateImplementation(entity, id, req);
  }

  protected async updateImplementation(
    entity: Partial<TDto>,
    id: string,
    req: AuthenticatedRequest,
  ) {
    const item = this.mapFromDto(entity);

    const updatedItem = await this.service.update(
      req.user.id,
      id,
      item,
      undefined,
    );
    const dto: TDto = this.mapToDto(updatedItem);

    return dto;
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async delete(
    @Param('id') id: string,
    @Req()
    req: AuthenticatedRequest,
  ) {
    await this.deleteImplementation(req, id);
  }

  protected async deleteImplementation(req: AuthenticatedRequest, id: string) {
    if (!id) {
      throw new BadRequestException(
        "Devi specificare un id come parametro dell'url",
      );
    }

    await this.service.delete(
      req.user.id,
      id,
      undefined,
      // this.getUserFiltersAsOptions(req)
    );
  }

  protected mapToDto(item: T): TDto {
    return this.mapper.map(item, this.entityType, this.entityDto);
  }

  protected mapFromDto(item: Partial<TDto>): Partial<T> {
    return this.mapper.map(item, this.entityDto, this.entityType);
  }
}