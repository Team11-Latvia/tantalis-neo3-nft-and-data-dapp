import { Controller, Get, Logger, Param, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { NftBidInfoDto } from '../catalog/dto/nft.item.dto';
import { BidService } from './bid.service';

@ApiTags('Bid History')
@Controller('/bid-history')
export class BidHistoryController {
    private readonly logger = new Logger(BidHistoryController.name);

    constructor(
        private readonly bidService: BidService
    ) {
    }

    @Get('/item/:identifier')
    @ApiOperation({ summary: 'Get bids history for an item' })
    @ApiResponse({ status: 200, description: 'The bids history for an item', type: NftBidInfoDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getBidHistory(
        @Req() req: Request,
        @Param('identifier') identifier: string
    ): Promise<NftBidInfoDto[]> {
        this.logger.verbose(`${req.method} : ${req.url} : ${identifier}`);
        return this.bidService.getBidHistory(identifier);
    }
}
