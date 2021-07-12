import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Logger, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateNftService } from './create.nft.service';
import { CreateNftItemResultDto } from './dto/create.nft.item.result.dto';
import { CreateNftItemDto } from './dto/create.nft.item.dto';

@ApiTags('Create NFT')
@Controller('/create')
export class CreateNftController {
    private readonly logger = new Logger(CreateNftController.name);

    constructor(
        private readonly createNftService: CreateNftService
    ) {
    }

    @Get('/:address/:identifier')
    @ApiOperation({ summary: 'Get state of a created NFT item' })
    @ApiResponse({ status: 201, description: 'A state of a created NFT item', type: CreateNftItemResultDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getNftItemState(
        @Req() req: Request,
        @Param('address') address: string,
        @Param('identifier') identifier: string,
        @Body() dto: CreateNftItemDto
    ): Promise<CreateNftItemResultDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${address} : ${identifier}`);
        return this.createNftService.getNftItemState(address, identifier);
    }

    @Post('/:address')
    @ApiOperation({ summary: 'Create NFT item' })
    @ApiResponse({ status: 201, description: 'Created NFT item', type: CreateNftItemResultDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async createNftItem(
        @Req() req: Request,
        @Param('address') address: string,
        @Body() dto: CreateNftItemDto
    ): Promise<CreateNftItemResultDto> {
        this.logger.verbose(`${req.method} : ${req.url}: ${address} : ${JSON.stringify(dto)}`);
        return this.createNftService.createNftItem(address, dto);
    }
}
