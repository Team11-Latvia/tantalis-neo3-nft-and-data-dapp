import { Controller, Get, Logger, OnApplicationBootstrap, OnApplicationShutdown, Param, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BlockchainService } from './blockchain.service';
import { AssetBalanceDto } from './dto/asset.balance.dto';
import { BlockchainNetwork } from './types/blockchain.network';

@ApiTags('Blockchain')
@Controller('/blockchain')
export class BlockchainController implements OnApplicationBootstrap, OnApplicationShutdown {
    private readonly logger = new Logger(BlockchainController.name);

    constructor(
        private readonly blockchainService: BlockchainService
    ) {
    }

    @Get('/balances/:address')
    @ApiOperation({ summary: 'Get Address balances' })
    @ApiResponse({ status: 200, description: 'The Address balances', type: AssetBalanceDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getAddressBalances(
        @Req() req: Request,
        @Param('address') address: string
    ): Promise<AssetBalanceDto[]> {
        this.logger.verbose(`${req.method} : ${req.url} : ${address}`);
        return this.blockchainService.balanceOf(address);
    }

    @Get('/balance/:asset/:address')
    @ApiOperation({ summary: 'Get Address balance by asset code' })
    @ApiResponse({ status: 200, description: 'The Address balance by asset code', type: AssetBalanceDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getAddressBalanceByAsset(
        @Req() req: Request,
        @Param('asset') asset: string,
        @Param('address') address: string
    ): Promise<AssetBalanceDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${asset} : ${address}`);
        return this.blockchainService.balanceByAssetOf(asset, address);
    }

    async onApplicationBootstrap(): Promise<any> {
        try {
            this.logger.debug('Initializing...');
            this.blockchainService.connect(BlockchainNetwork.Default);
            await this.blockchainService.testConnection();
        } catch(e) {
            this.logger.error(e);
        }
    }

    onApplicationShutdown(signal?: string): any {
        try {
            this.logger.debug(`Terminating with ${signal}...`);
            this.blockchainService.disconnect();
        } catch(e) {
            this.logger.error(e);
        }
    }
}