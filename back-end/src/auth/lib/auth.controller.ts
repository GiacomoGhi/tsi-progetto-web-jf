import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSingUp } from 'src/common/lib/user-sing-up';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sing-up')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
        firstName: { type: 'string' },
        nickName: { type: 'string' },
        lastName: { type: 'string' },
        profession: { type: 'string' },
      },
    },
  })
  async create(@Body() user: UserSingUp) {
    const res = await this.authService.create(user);
    return {
      status: res,
    };
  }

  @Post('login')
  @ApiOperation({
    summary: 'get current user',
    description: 'get current user',
  })
  @ApiOkResponse({
    description: 'Get current user information',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        fullName: { type: 'string' },
        role: { type: 'string' },
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @HttpCode(200)
  async login(@Body() body: { email: string; password: string }) {
    const jwt = await this.authService.login(body);

    return {
      access_token: jwt,
      token_type: 'JWT',
      expires_in: 3600,
    };
  }
}
