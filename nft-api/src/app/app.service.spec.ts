import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('App Service', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return API root', () => {
      expect(appService.getApiRoot()).toBeDefined();
    });
  });
});
