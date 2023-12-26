import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusService {
  getData(): { version: string } {
    return { version: '0.9.0' };
  }
}
