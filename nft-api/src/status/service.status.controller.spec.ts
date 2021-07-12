import { Test, TestingModule } from '@nestjs/testing';
import { ServiceStatusController } from './service.status.controller';
import { ServiceStatusService } from './service.status.service';

describe('Service Status Controller', () => {
  let controller: ServiceStatusController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceStatusController],
      providers: [ServiceStatusService],
    }).compile();

    controller = app.get<ServiceStatusController>(ServiceStatusController);
  });

  describe('Controller', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
