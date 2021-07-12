import { Body, Controller, Get, Logger, Param, Post, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { NftBidInfoDto } from '../catalog/dto/nft.item.dto';
import { BidService } from './bid.service';
import { BidNftItemResultDto } from './dto/bid.nft.item.result.dto';

@ApiTags('Bid')
@Controller('/bid')
export class BidController {
    private readonly logger = new Logger(BidController.name);

    constructor(
        private readonly bidService: BidService
    ) {
    }

    @Get('/current/:identifier')
    @ApiOperation({ summary: 'Get current bid for an item' })
    @ApiResponse({ status: 200, description: 'Current bid for an item', type: NftBidInfoDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getCurrentBid(
        @Req() req: Request,
        @Param('identifier') identifier: string
    ): Promise<NftBidInfoDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${identifier}`);
        return this.bidService.getCurrentBid(identifier);
    }

    @Post('/:address/:identifier')
    @ApiOperation({ summary: 'Buy NFT Item' })
    @ApiBody({ type: NftBidInfoDto })
    @ApiResponse({ status: 200, description: 'The NFT Item to buy', type: BidNftItemResultDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async postBidItem(
        @Req() req: Request,
        @Param('address') address: string,
        @Param('identifier') identifier: string,
        @Body() dto: NftBidInfoDto
    ): Promise<BidNftItemResultDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${address} : ${identifier} : ${JSON.stringify(dto)}`);
        return this.bidService.bidItem(address, identifier, dto);
    }
}