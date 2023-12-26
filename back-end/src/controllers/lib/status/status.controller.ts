import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatusService } from '../../../services/index';
@Controller('status')
@ApiTags('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @ApiOperation({
    summary: 'get status',
    description: 'get status',
  })
  @ApiOkResponse({
    description: 'status',
    schema: {
      properties: {
        version: { type: 'string' },
      },
    },
  })
  getData() {
    return this.statusService.getData();
  }
}
