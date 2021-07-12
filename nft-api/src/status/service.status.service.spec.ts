import { Test, TestingModule } from '@nestjs/testing';
import { ServiceStatusService } from './service.status.service';

describe('Service Status Service', () => {
  let service: ServiceStatusService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [ServiceStatusService],
    }).compile();

    service = app.get<ServiceStatusService>(ServiceStatusService);
  });

  describe('Service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
