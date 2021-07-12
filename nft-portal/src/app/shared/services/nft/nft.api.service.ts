import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WalletPluginService } from '../wallet/wallet.plugin.service';
import { CreateNftItemDto } from './dto/create.nft.item.dto';
import { CreateNftItemResultDto } from './dto/create.nft.item.result.dto';
import { NftBidItemResultDto } from './dto/nft.bid.item.result.dto';
import { NftBuyItemResultDto } from './dto/nft.buy.item.result.dto';
import { NftCategoryDto } from './dto/nft.category.dto';
import { NftContractDto } from './dto/nft.contract.dto';
import { NftItemDto } from './dto/nft.item.dto';
import { NftSuperCategoryDto } from './dto/nft.super.category.dto';
import { NftApiServiceInterface } from './nft.api.service.interface';
import { OverallStatsDto } from './overall.stats.dto';
import { Decimal as DecimalJS } from 'decimal.js';
import { SellNftItemResultDto } from './dto/sell.nft.item.result.dto';

@Injectable({ providedIn: 'root' })
export class NftApiService implements NftApiServiceInterface {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly walletPluginService: WalletPluginService
    ) {
    }

    //
    // Categories
    //

    async getSuperCategories(): Promise<NftSuperCategoryDto[]> {
        const superCategories = await this.httpClient.get<NftSuperCategoryDto[]>(`/catalog/super-categories`).toPromise();
        return superCategories;
    }

    async getCategories(): Promise<NftCategoryDto[]> {
        const categories = await this.httpClient.get<NftCategoryDto[]>(`/catalog/categories`).toPromise();
        return categories;
    }

    //
    // Contracts
    //

    async getNftContracts(): Promise<NftContractDto[]> {
        const contracts = await this.httpClient.get<NftContractDto[]>(`/catalog/contracts`).toPromise();
        return contracts;
    }

    async getNftContract(identifier: string): Promise<NftContractDto | undefined> {
        const contract = await this.httpClient.get<NftContractDto>(`/catalog/contract/${identifier}`).toPromise();
        return contract;
    }

    //
    // Contract items (NFTs)
    //

    async getAllNftItems(): Promise<NftItemDto[]> {
        const items = await this.httpClient.get<NftItemDto[]>(`/catalog/items/all`).toPromise();
        return items;
    }

    async getOwnNftItems(address: string): Promise<NftItemDto[]> {
        const items = await this.httpClient.get<NftItemDto[]>(`/catalog/items/own/${address}`).toPromise();
        return items;
    }

    // Under Easy discover digital asset All over the world!
    async getChosenNftItems(): Promise<NftItemDto[]> {
        const items = await this.httpClient.get<NftItemDto[]>(`/catalog/items/chosen`).toPromise();
        return items;
    }

    // Under Trending collections in all categories
    async getTrendingNftItems(): Promise<NftItemDto[]> {
        const items = await this.httpClient.get<NftItemDto[]>(`/catalog/items/trending`).toPromise();
        return items;
    }

    // Right side of Collect. Discover. Trade left side
    async getHeroNftItems(): Promise<NftItemDto[]> {
        const items = await this.httpClient.get<NftItemDto[]>(`/catalog/items/hero`).toPromise();
        return items;
    }

    async getNftItem(identifier: string): Promise<NftItemDto | undefined> {
        const item = await this.httpClient.get<NftItemDto>(`/catalog/item/${identifier}`).toPromise();
        return item;
    }

    //
    // Price & Sell
    //

    async sellNftItem(address: string, identifier: string, dto: NftItemDto):  Promise<SellNftItemResultDto> {
        const result = await this.httpClient.post<SellNftItemResultDto>(`/sell/${address}/${identifier}`, dto).toPromise();
        return result;
    }

    async setPriceForNftItem(address: string, identifier: string, dto: NftItemDto):  Promise<SellNftItemResultDto> {
        const result = await this.httpClient.put<SellNftItemResultDto>(`/sell/price/${address}/${identifier}`, dto).toPromise();
        return result;
    }

    //
    // Trading
    //

    async buyNftItem(address: string, identifier: string): Promise<NftBuyItemResultDto> {
        // Sign TX locally
        const nftItem = await this.httpClient.get<NftItemDto>(`/catalog/item/${identifier}`).toPromise();
        const nftItemPrice = nftItem.price?.price ?? '1';

        // TODO: Move out fee calc out of here
        const providerFee = new DecimalJS(2.5).div(100);
        const authorFee = new DecimalJS(5).div(100);
        const providerFeeAmount = new DecimalJS(nftItemPrice).mul(providerFee).toNumber();
        const authorFeeAmount = new DecimalJS(nftItemPrice).mul(authorFee).toNumber();
        const totalAmount = new DecimalJS(nftItemPrice).plus(providerFeeAmount).plus(authorFeeAmount).toString();

        const signTx = {
            fromAddress: address,
            toAddress: nftItem.ownerAddress,
            asset: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
            amount: totalAmount,
            fee: '0.15',
            remark: `For: ${nftItem.name}`
        };
        const signResult = await this.walletPluginService.announceTx(signTx);
        console.dir(signResult);

        // Perform operation at the API side and start waiting for result (both API via RMQ & Portal via WS sides)
        const result = await this.httpClient.post<NftBuyItemResultDto>(`/buy/${address}/${identifier}`, {}).toPromise();
        return result;
    }

    async bidNftItem(address: string, identifier: string): Promise<NftBidItemResultDto> {
        const result = await this.httpClient.post<NftBuyItemResultDto>(`/bid/${address}/${identifier}`, {}).toPromise();
        return result;
    }

    //
    // Creation
    //

    async createNftItem(address: string, item: CreateNftItemDto): Promise<CreateNftItemResultDto> {
        const result = await this.httpClient.post<CreateNftItemResultDto>(`/create/${address}`, item).toPromise();
        return result;
    }

    //
    // Favorite and Unfavorite
    //

    async getFavoritetems(address: string): Promise<NftItemDto[]> {
        const items = await this.httpClient.get<NftItemDto[]>(`/catalog/items/favorite/${address}`).toPromise();
        return items;
    }

    async makeFavoriteItem(address: string, nftItem: NftItemDto): Promise<NftItemDto> {
        const result = await this.httpClient.post<NftItemDto>(`/catalog/items/favorite/${address}`, nftItem).toPromise();
        return result;
    }

    async removeFavoriteItem(address: string, identifier: string): Promise<NftItemDto> {
        const result = await this.httpClient.delete<NftItemDto>(`/catalog/items/favorite/${address}/${identifier}`).toPromise();
        return result;
    }

    //
    // Stats
    //

    async getOverallStatistic(): Promise<OverallStatsDto> {
        const overallStats = await this.httpClient.get<OverallStatsDto>(`/stats/overall`).toPromise();
        return overallStats;
    }
}