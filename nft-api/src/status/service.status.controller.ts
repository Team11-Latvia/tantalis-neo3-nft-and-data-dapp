import { Controller, Get, Logger, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ServiceStatusDto } from './dto/service.status.dto';
import { ServiceStatusService } from './service.status.service';

@ApiTags('Service')
@Controller('/service')
export class ServiceStatusController {
  private readonly logger = new Logger(ServiceStatusController.name);

  constructor(private readonly serviceStatusService: ServiceStatusService) {}

  @Get('/status')
  @ApiOperation({ summary: 'Get Service Status' })
  @ApiResponse({ status: 200, description: 'The Service Status', type: ServiceStatusDto })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getServiceStatus(
    @Req() req: Request
  ): Promise<ServiceStatusDto> {
    this.logger.verbose(`${req.method} : ${req.url}`);
    return this.serviceStatusService.getServiceStatus();
  }
}