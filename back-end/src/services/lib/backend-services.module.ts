import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackendConfigModule, BackendConfigService } from '@config';

import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { StatusService } from './status.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    BackendConfigModule,
    // BackendClientsModule,
  ],

  providers: [Logger, UserService, StatusService],

  exports: [UserService, StatusService],
})
export class BackendServicesModule {}
