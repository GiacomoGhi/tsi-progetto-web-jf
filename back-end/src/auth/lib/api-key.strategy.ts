/* eslint-disable @typescript-eslint/no-explicit-any */
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import Strategy from 'passport-headerapikey';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  Strategy,
  'api-key' || 'credentials',
) {
  constructor(private readonly authService: AuthService) {
    super(
      { header: 'x-api-key', prefix: '' },
      true,
      async (apiKey: any, done: any /* , req: any */) => {
        Logger.debug('validate api-key');
        const isApiKeyValid = await this.authService.validateApiKey(apiKey);
        if (isApiKeyValid) {
          done(null, {
            id: '0',
            firstName: 'system',
            lastName: 'system',
            role: 0,
          });
        }
        done(new UnauthorizedException('Invalid x-api-key'), null);
      },
    );
  }
}
