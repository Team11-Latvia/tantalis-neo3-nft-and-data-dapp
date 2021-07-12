import { Controller, Get, Logger, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { OverallStatsDto } from './dto/overall.stats.dto';
import { StatsService } from './stats.service';

@ApiTags('Statistic')
@Controller('/stats')
export class StatsController {
  private readonly logger = new Logger(StatsController.name);

  constructor(private readonly statsService: StatsService) {
  }

  @Get('/overall')
  @ApiOperation({ summary: 'Get Overall statistics' })
  @ApiResponse({ status: 200, description: 'The Overall statistics', type: OverallStatsDto })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getOverallStatistic(
    @Req() req: Request
  ): Promise<OverallStatsDto> {
    this.logger.verbose(`${req.method} : ${req.url}`);
    return this.statsService.getOverallStatistic();
  }
}