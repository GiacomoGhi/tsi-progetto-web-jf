import { DynamicModule, Module, Logger } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { BackendConfigModule, BackendConfigService } from '@config';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from 'src/auth/lib/jwt-auth.guard';
import { BackendServicesModule, UserEntity, UserService } from '@services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { BackendMailModule } from 'src/mail';

@Module({})
export class BackendAuthModule {
  static forRoot(): DynamicModule {
    return {
      module: BackendAuthModule,
      imports: [
        BackendMailModule,
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.registerAsync({
          imports: [BackendConfigModule, BackendServicesModule],
          inject: [BackendConfigService],
          useFactory: async (configService: BackendConfigService) => ({
            secret: configService.getConfiguration().jwtSecret,
            signOptions: { expiresIn: '3600s' },
          }),
        }),
      ],
      controllers: [AuthController],
      providers: [
        Logger,
        AuthService,
        JwtStrategy,
        JwtAuthGuard,
        UserService,
        BackendConfigService,
      ],
      exports: [AuthService],
    };
  }
}
