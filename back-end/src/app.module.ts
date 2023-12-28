import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackendControllersModule } from './controllers';
import { BackendConfigModule, BackendConfigService } from './config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CommonProfile } from './controllers';
@Module({
  imports: [
    BackendConfigModule,
    BackendControllersModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),

    AutomapperModule.forRoot([
      {
        name: 'mapper',
        strategyInitializer: classes(),
      },
    ]),

    // Repository
    TypeOrmModule.forRootAsync({
      imports: [BackendConfigModule],
      inject: [BackendConfigService],
      useFactory: async (configProvider: BackendConfigService) => {
        const config = configProvider.getConfiguration();
        const {
          dbConnectionString,
          dbHost,
          dbPort,
          dbUser,
          dbPassword,
          dbName,
        } = config;

        return {
          type: 'postgres',
          url:
            dbConnectionString ||
            `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`,
          autoLoadEntities: true,
          timezone: 'Z',
          requestTimeout: 120000,
          logging: true,
          synchronize: true,
        };
      },
    }),
  ],
  controllers: [],
  providers: [CommonProfile],
})
export class AppModule {}