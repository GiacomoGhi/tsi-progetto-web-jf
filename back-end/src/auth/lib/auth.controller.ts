import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSingUp } from 'src/common/lib/user-sing-up';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

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

  @Post('reset-password')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
      },
    },
  })
  async reset(@Body() body: { email: string }) {
    const res = await this.authService.reset(body);
    return {
      status: res,
    };
  }

  @Post('login')
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

  @Get('confirm-email')
  async confirmEmail(@Query('token') token: string) {
    const res = await this.authService.validateEmail(token);
    return res;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @HttpCode(200)
  async getUser(@Req() request: Request) {
    const authorizationHeader = request.headers['authorization'];
    const token = authorizationHeader.replace(/^Bearer\s+/i, '');

    const user = await this.authService.getUser(token);

    return user;
  }
}
