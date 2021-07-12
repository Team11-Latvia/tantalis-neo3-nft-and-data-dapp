import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get API Root' })
  @ApiResponse({ status: 200, description: 'The API Root', type: Object })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  getApiRoot(): object {
    return this.appService.getApiRoot();
  }
}
