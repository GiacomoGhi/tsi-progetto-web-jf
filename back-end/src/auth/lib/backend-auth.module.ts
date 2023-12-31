import { HttpModule, HttpService } from '@nestjs/axios';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { ApiKeyStrategy } from './api-key.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BackendConfigModule, BackendConfigService } from '@config';
import { BackendServicesModule, UserService } from '@services';

@Module({})
export class BackendAuthModule {
  static forRoot(): DynamicModule {
    return {
      module: BackendAuthModule,
      imports: [
        JwtModule.register({
          secret: 'TSI',
          signOptions: { expiresIn: '1h' },
        }),
        HttpModule,
        BackendConfigModule,
        BackendServicesModule,
      ],
      controllers: [AuthController],
      providers: [
        {
          useFactory: (
            backendConfigService: BackendConfigService,
            httpService: HttpService,
            jwtService: JwtService,
            userService: UserService,
          ) => {
            return new AuthService(
              httpService,
              jwtService,
              backendConfigService.getConfiguration(),
              userService,
            );
          },
          provide: AuthService,
          inject: [BackendConfigService, HttpService, JwtService, UserService],
        },
        ApiKeyStrategy,
        Logger,
      ],
      exports: [AuthService],
    };
  }
}
