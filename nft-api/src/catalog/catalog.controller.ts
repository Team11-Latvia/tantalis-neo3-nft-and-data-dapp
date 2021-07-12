import { Body, Controller, Delete, Get, Logger, Param, Post, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CatalogService } from './catalog.service';
import { NftCategoryDto } from './dto/nft.category.dto';
import { NftContractDto } from './dto/nft.contract.dto';
import { NftItemDto } from './dto/nft.item.dto';
import { NftSuperCategoryDto } from './dto/nft.super.category.dto';
import { FavoriteService } from './favorite.service';

@ApiTags('NFT Catalog')
@Controller('/catalog')
export class CatalogController {
    private readonly logger = new Logger(CatalogController.name);

    constructor(
        private readonly catalogService: CatalogService,
        private readonly favoriteService: FavoriteService
    ) {
    }

    @Get('/super-categories')
    @ApiOperation({ summary: 'Get Categories' })
    @ApiResponse({ status: 200, description: 'The NFT Categories', type: NftSuperCategoryDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getSuperCategories(
        @Req() req: Request
    ): Promise<NftSuperCategoryDto[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.catalogService.getSuperCategories();
    }

    @Get('/categories')
    @ApiOperation({ summary: 'Get Categories' })
    @ApiResponse({ status: 200, description: 'The NFT Categories', type: NftCategoryDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getCategories(
        @Req() req: Request
    ): Promise<NftCategoryDto[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.catalogService.getCategories();
    }

    @Get('/contracts')
    @ApiOperation({ summary: 'Get NFT Contracts' })
    @ApiResponse({ status: 200, description: 'The NFT Contracts with items (all, paginated)', type: NftContractDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getAllContracts(
        @Req() req: Request
    ): Promise<NftContractDto[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.catalogService.getAllContracts();
    }

    @Get('/contract/:identifier')
    @ApiOperation({ summary: 'Get NFT Contract' })
    @ApiResponse({ status: 200, description: 'The NFT Contract with items', type: NftContractDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getContract(
        @Req() req: Request,
        @Param('identifier') identifier: string
    ): Promise<NftContractDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${identifier}`);
        return this.catalogService.getContract(identifier);
    }

    @Get('/items/all')
    @ApiOperation({ summary: 'Get NFT Items' })
    @ApiResponse({ status: 200, description: 'The NFT Items (all, paginated)', type: NftItemDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getAllItems(
        @Req() req: Request
    ): Promise<NftItemDto[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.catalogService.getAllItems();
    }

    @Get('/items/own/:address')
    @ApiOperation({ summary: 'Get Own NFT Items' })
    @ApiResponse({ status: 200, description: 'The Own NFT Items', type: NftItemDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getOwnItems(
        @Req() req: Request,
        @Param('address') address: string
    ): Promise<NftItemDto[]> {
        this.logger.verbose(`${req.method} : ${req.url} : ${address}`);
        return this.catalogService.getOwnItems(address);
    }

    @Get('/items/chosen')
    @ApiOperation({ summary: 'Get NFT Chosen Items' })
    @ApiResponse({ status: 200, description: 'The NFT Chosen Items', type: NftItemDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getChosenItems(
        @Req() req: Request
    ): Promise<NftItemDto[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.catalogService.getChosenItems();
    }

    @Get('/items/trending')
    @ApiOperation({ summary: 'Get NFT Trending Items' })
    @ApiResponse({ status: 200, description: 'The NFT Trending Items', type: NftItemDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getTrendingItems(
        @Req() req: Request
    ): Promise<NftItemDto[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.catalogService.getTrendingItems();
    }

    @Get('/items/hero')
    @ApiOperation({ summary: 'Get NFT Hero Items' })
    @ApiResponse({ status: 200, description: 'The NFT Hero Items', type: NftItemDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getHeroItems(
        @Req() req: Request
    ): Promise<NftItemDto[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.catalogService.getHeroItems();
    }

    @Get('/items/favorite/:address')
    @ApiOperation({ summary: 'Get NFT Favorite Items' })
    @ApiResponse({ status: 200, description: 'The NFT Favorite Items', type: NftItemDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getFavoriteItems(
        @Req() req: Request,
        @Param('address') address: string
    ): Promise<NftItemDto[]> {
        this.logger.verbose(`${req.method} : ${req.url} : ${address}`);
        return this.favoriteService.getFavoriteItems(address);
    }

    @Post('/items/favorite/:address')
    @ApiOperation({ summary: 'Makr NFT Item as favorite' })
    @ApiBody({ type: NftItemDto })
    @ApiResponse({ status: 200, description: 'The NFT Favorite Item', type: NftItemDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async postFavoriteItem(
        @Req() req: Request,
        @Param('address') address: string,
        @Body() dto: NftItemDto
    ): Promise<NftItemDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${address} : ${JSON.stringify(dto)}`);
        return this.favoriteService.markFavoriteItem(address, dto);
    }

    @Delete('/items/favorite/:address/:identifier')
    @ApiOperation({ summary: 'Unmakr NFT Item as favorite' })
    @ApiResponse({ status: 200, description: 'The NFT Favorite Item to be unmarked', type: NftItemDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async deleteFavoriteItem(
        @Req() req: Request,
        @Param('address') address: string,
        @Param('identifier') identifier: string
    ): Promise<NftItemDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${address} : ${identifier}`);
        return this.favoriteService.unmarkFavoriteItem(address, identifier);
    }

    @Get('/item/:identifier')
    @ApiOperation({ summary: 'Get NFT Item by its identifier' })
    @ApiResponse({ status: 200, description: 'The NFT Item', type: NftItemDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getItem(
        @Req() req: Request,
        @Param('identifier') identifier: string 
    ): Promise<NftItemDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${identifier}`);
        return this.catalogService.getItem(identifier);
    }
}