import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigInterface } from './config.interface';

@Injectable()
export class BackendConfigService {

  private readonly logger = new Logger(BackendConfigService.name);

  constructor(private configService: ConfigService) {
    this.logger.log(this.getConfiguration());
  }

  getConfiguration(): ConfigInterface {
    return (
      this.configService.get<ConfigInterface>('app') ?? ({} as ConfigInterface)
    );
  }
}
