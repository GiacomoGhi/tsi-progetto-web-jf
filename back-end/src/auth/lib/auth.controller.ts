import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@common';

import { HeaderApiKeyGuard } from './api-key.guard';
import { AuthService } from './auth.service';
import { HeaderCredentialsGuard } from './credentials.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  async getMe(@Request() request: any) {
    const loggedUser = await this.authService.getLoggedUser(request.user);

    if (!loggedUser.active) {
      throw new ForbiddenException('Utente non attivo');
    }

    return loggedUser;
  }

  @ApiSecurity('x-api-key', ['x-api-key'])
  @UseGuards(HeaderApiKeyGuard)
  @Post('login/api-key')
  @ApiOperation({
    summary: 'login from api key',
    description: 'login from api key',
  })
  @ApiOkResponse({
    description: 'Get access token',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
      },
    },
  })
  async loginFromApiKey() {
    return this.authService.loginFromApiKey();
  }

  @ApiSecurity('x-credentials', ['x-credentials'])
  //@UseGuards(HeaderCredentialsGuard)
  @Post('login/credentials')
  @ApiOperation({
    summary: 'login from credentials',
    description: 'login from credentials',
  })
  @ApiOkResponse({
    description: 'Get access token',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', default: '' },
        password: { type: 'string', default: '' },
      },
    },
  })
  async loginFromCredentials(
    @Body()
    body: {
      email: string;
      password: string;
    },
  ) {
    return this.authService.loginFromCredentials(body);
  }
}
