import { Controller, Get, Logger, Param, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SystemParamsDto } from './dto/system.params.dto';
import { SystemParamsService } from './system.params.service';

@ApiTags('System Params')
@Controller('/system/params')
// TODO: Protect by Admin Auth
export class SystemParamsController {
    private readonly logger = new Logger(SystemParamsController.name);

    constructor(
        private readonly systemParamsService: SystemParamsService
    ) {
    }

    @Get('/:key')
    @ApiOperation({ summary: 'Get System params by a key' })
    @ApiResponse({ status: 200, description: 'System params by a key', type: SystemParamsDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getCurrentBid(
        @Req() req: Request,
        @Param('key') key: string
    ): Promise<SystemParamsDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${key}`);
        return this.systemParamsService.getByKey(key);
    }
}