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
import { ArticleEntity, ArticleService } from '../../services/index';
import { EntityType } from '@common';
import { BaseController } from './base.controller';
import { ArticleEntityDto } from './dto/article.entity.dto';
import { AuthenticatedRequest } from './guards/authenticated-request.interface';
import { union } from 'lodash';

@Controller('Article')
@ApiTags('Article')
@EntityType(ArticleEntity, ArticleEntityDto)
export class ArticleController extends BaseController<
  ArticleEntity,
  ArticleService,
  ArticleEntityDto
> {
  constructor(
    service: ArticleService,
    logger: Logger,
    @InjectMapper('mapper') mapper: Mapper,
  ) {
    super(service, logger, mapper);
  }

  @Post('news-paged')
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
  async getNewsPaged(
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
    return await this.getNewsPagedImplementation(req, body);
  }

  protected async getNewsPagedImplementation(
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

    const res = await this.service.findNewsPaged(
      body.take,
      body.skip,
      body.filters,
      body.orderBy,
      join,
      body.join != null, // se vengono passate esplicitamente delle relations, sovrascrivo quelle base
    );

    const dtos: ArticleEntityDto[] = [];
    for (const item of res.items) {
      const dto = this.mapToDto(item);

      dtos.push(dto);
    }

    return { ...res, items: dtos };
  }
}
