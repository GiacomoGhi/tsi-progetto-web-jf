import { Logger, Module } from '@nestjs/common';
import { BackendServicesModule } from '../../services/lib/backend-services.module';

import { CommonProfile } from './mapping-profiles/common-profile';
import { UserController } from './user.controller';

@Module({
  imports: [BackendServicesModule],
  controllers: [UserController],
  providers: [Logger, CommonProfile],
  exports: [CommonProfile],
})
export class BackendControllersModule {}
