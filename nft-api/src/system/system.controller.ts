import { Controller, Get, Logger, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BlockchainInfoDto } from './dto/blockchain.info.dto';
import { SystemService } from './system.service';

@ApiTags('System')
@Controller('/system')
export class SystemController {
    private readonly logger = new Logger(SystemController.name);

    constructor(
        private readonly systemService: SystemService
    ) {
    }

    @Get('/blockchain/info')
    @ApiOperation({ summary: 'Get Blockchain info' })
    @ApiResponse({ status: 200, description: 'Blockchain info', type: BlockchainInfoDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getCurrentBid(
        @Req() req: Request
    ): Promise<BlockchainInfoDto> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.systemService.getBlockchainInfo();
    }
}