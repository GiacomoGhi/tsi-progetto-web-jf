import { Test, TestingModule } from '@nestjs/testing';

import { StatusController } from './status.controller';
import { StatusService } from '../../../services/lib/backend-services.module';

describe('StatusController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [StatusService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to my-nest-app!"', () => {
      const statusController = app.get<StatusController>(StatusController);
      expect(statusController.getData()).toEqual({
        version: '1.0.0',
      });
    });
  });
});
