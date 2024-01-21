import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, HttpCode, Logger, Post, Req } from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  ArticleEntity,
  ArticleService,
  HitEntity,
  HitService,
} from '../../services/index';
import { EntityType } from '@common';
import { BaseController } from './base.controller';

import { HitEntityDto } from './dto/hit.entity.dto';
import { AuthenticatedRequest } from './guards/authenticated-request.interface';

@Controller('Hit')
@ApiTags('Hit')
@EntityType(HitEntity, HitEntityDto)
export class HitController extends BaseController<
  HitEntity,
  HitService,
  HitEntityDto
> {
  constructor(
    service: HitService,
    logger: Logger,
    @InjectMapper('mapper') mapper: Mapper,
  ) {
    super(service, logger, mapper);
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
  async getPaged(
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
}
