import { Body, Controller, Logger, Param, Post, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { NftItemDto } from '../catalog/dto/nft.item.dto';
import { BuyService } from './byu.service';
import { BuyNftItemResultDto } from './dto/buy.nft.item.result.dto';

@ApiTags('Buy')
@Controller('/buy')
export class BuyController {
    private readonly logger = new Logger(BuyController.name);

    constructor(
        private readonly buyService: BuyService
    ) {
    }

    @Post('/:address/:identifier')
    @ApiOperation({ summary: 'Buy NFT Item' })
    @ApiBody({ type: NftItemDto })
    @ApiResponse({ status: 200, description: 'The NFT Item to buy', type: BuyNftItemResultDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async postBuyItem(
        @Req() req: Request,
        @Param('address') address: string,
        @Param('identifier') identifier: string,
        @Body() dto: NftItemDto
    ): Promise<BuyNftItemResultDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${address} : ${identifier} : ${JSON.stringify(dto)}`);
        return this.buyService.buyItem(address, identifier, dto);
    }
}