import { Test } from '@nestjs/testing';

import { StatusService } from './status.service';

describe('StatusService', () => {
  let service: StatusService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [StatusService],
    }).compile();

    service = app.get<StatusService>(StatusService);
  });

  describe('getData', () => {
    it('should return version 1.0.0', () => {
      expect(service.getData()).toEqual({ version: '1.0.0' });
    });
  });
});
