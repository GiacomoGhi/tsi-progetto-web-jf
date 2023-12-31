/* eslint-disable @typescript-eslint/no-explicit-any */
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import Strategy from 'passport-headerapikey';

@Injectable()
export class CredentialsStrategy extends PassportStrategy(
  Strategy,
  'credentials',
) {
  constructor(private readonly authService: AuthService) {
    super(
      { header: 'x-credentials', prefix: '' },
      true,
      async (
        credentials: {
          email: string;
          password: string;
        },
        done: any,
      ) => {
        Logger.debug('validate credentials');
        const isApiKeyValid = await this.authService.validateApiKey('');
        if (isApiKeyValid) {
          done(null, {
            id: '0',
            firstName: 'system',
            lastName: 'system',
            role: 0,
          });
        }
        done(new UnauthorizedException('Invalid x-credentials'), null);
      },
    );
  }
}
