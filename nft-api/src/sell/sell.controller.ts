import { Body, Controller, Logger, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { NftItemDto } from '../catalog/dto/nft.item.dto';
import { SellService } from './sell.service';
import { SellNftItemResultDto } from './dto/sell.nft.item.result.dto';

@ApiTags('Sell')
@Controller('/sell')
export class SellController {
    private readonly logger = new Logger(SellController.name);

    constructor(
        private readonly sellService: SellService
    ) {
    }

    @Post('/:address/:identifier')
    @ApiOperation({ summary: 'Sell NFT Item' })
    @ApiBody({ type: NftItemDto })
    @ApiResponse({ status: 200, description: 'The NFT Item to sell', type: SellNftItemResultDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async postSell(
        @Req() req: Request,
        @Param('address') address: string,
        @Param('identifier') identifier: string,
        @Body() dto: NftItemDto
    ): Promise<SellNftItemResultDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${address} : ${identifier} : ${JSON.stringify(dto)}`);
        return this.sellService.sellItem(address, identifier, dto);
    }

    @Put('/price/:address/:identifier')
    @ApiOperation({ summary: 'Set Price for NFT Item' })
    @ApiBody({ type: NftItemDto })
    @ApiResponse({ status: 200, description: 'The NFT Item to set price', type: SellNftItemResultDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async putPrice(
        @Req() req: Request,
        @Param('address') address: string,
        @Param('identifier') identifier: string,
        @Body() dto: NftItemDto
    ): Promise<SellNftItemResultDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${address} : ${identifier} : ${JSON.stringify(dto)}`);
        return this.sellService.setPriceItem(address, identifier, dto);
    }
}