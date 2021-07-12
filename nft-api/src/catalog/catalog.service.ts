import { Injectable } from '@nestjs/common';
import { CloneUtils } from '../shared/utils/clone.utils';
import { NftContractType } from '../entity/nft.contract.entity';
import { NftItemMedia, NftItemType } from '../entity/nft.item.entity';
import { NftCategoryDto } from './dto/nft.category.dto';
import { NftContractDto } from './dto/nft.contract.dto';
import { NftCurrencyDto, NftItemDto, NftPriceDto } from './dto/nft.item.dto';
import { NftCategoryRepository } from './repository/nft.category.repository';
import { NftContractRepository } from './repository/nft.contract.repository';
import { NftItemRepository } from './repository/nft.item.repository';
import { NftSuperCategoryDto } from './dto/nft.super.category.dto';

@Injectable()
export class CatalogService {
    private readonly mockSuperCategories: NftSuperCategoryDto[];
    private readonly mockCategories: NftCategoryDto[];
    private readonly mockContracts: NftContractDto[];

    constructor(
        private readonly nftCategoryRepository: NftCategoryRepository,
        private readonly nftContractRepository: NftContractRepository,
        private readonly nftItemRepository: NftItemRepository
    ) {
        this.mockSuperCategories = NftSuperCategoryDto.fromNftItemTypes();
        this.mockCategories = NftCategoryDto.fromNftItemTypes();

        const mockContractArt: NftContractDto = {
            uuid: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc1',
            type: NftContractType.NEP11,
            category: NftCategoryDto.fromNftItemType(NftItemType.Artwork),
            name: 'Team11 Artwork',
            description: 'Team11 Artwork',
            creatorAddress: 'NLg91vbeQXg7DMwzcg4UhYtgFdrTBNi3fG',
            publisherAddress: 'NLg91vbeQXg7DMwzcg4UhYtgFdrTBNi3fG',
            identifier: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc1',
            symbol: 'NFT11A',
            decimals: '0',
            totalSupply: '5',
            balance: '5',
            items: [],
            contractAddress: '11',
            createdTxHash: '12',
            resourceUrl: 'https://i.etsystatic.com/11771780/r/il/98b5a5/924555576/il_570xN.924555576_rhom.jpg',
            previewUrl: 'https://i.etsystatic.com/11771780/r/il/98b5a5/924555576/il_570xN.924555576_rhom.jpg',
        };

        const mockContractCollectible: NftContractDto = {
            uuid: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc2',
            type: NftContractType.NEP11,
            category: NftCategoryDto.fromNftItemType(NftItemType.Collectible),
            name: 'Team11 Collectibles',
            description: 'Team11 Collectibles',
            creatorAddress: 'NLg91vbeQXg7DMwzcg4UhYtgFdrTBNi3fG',
            publisherAddress: 'NLg91vbeQXg7DMwzcg4UhYtgFdrTBNi3fG',
            identifier: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc2',
            symbol: 'NFT11C',
            decimals: '0',
            totalSupply: '3',
            balance: '3',
            items: [],
            contractAddress: '21',
            createdTxHash: '22',
            resourceUrl: 'https://c8.alamy.com/comp/DR3AJ1/glendale-california-usa-18th-jan-2014-collectible-items-are-seen-on-DR3AJ1.jpg',
            previewUrl: 'https://c8.alamy.com/comp/DR3AJ1/glendale-california-usa-18th-jan-2014-collectible-items-are-seen-on-DR3AJ1.jpg',
        };

        const mockContractDomain: NftContractDto = {
            uuid: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc3',
            type: NftContractType.NEP11,
            category: NftCategoryDto.fromNftItemType(NftItemType.Domain),
            name: 'Team11 Domains',
            description: 'Team11 Domains',
            creatorAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
            publisherAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
            identifier: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc3',
            symbol: 'NFT11D',
            decimals: '0',
            totalSupply: '1',
            balance: '1',
            items: [],
            contractAddress: '31',
            createdTxHash: '32',
            resourceUrl: 'https://hostimul.com/uploads/catalog/tld.jpg',
            previewUrl: 'https://hostimul.com/uploads/catalog/tld.jpg',
        };

        const mockContractMeme: NftContractDto = {
            uuid: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc4',
            type: NftContractType.NEP11,
            category: NftCategoryDto.fromNftItemType(NftItemType.Meme),
            name: 'Team11 Memes',
            description: 'Team11 Memes',
            creatorAddress: 'NLg91vbeQXg7DMwzcg4UhYtgFdrTBNi3fG',
            publisherAddress: 'NLg91vbeQXg7DMwzcg4UhYtgFdrTBNi3fG',
            identifier: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc4',
            symbol: 'NFT11M',
            decimals: '0',
            totalSupply: '1',
            balance: '1',
            items: [],
            contractAddress: '41',
            createdTxHash: '42',
            resourceUrl: 'https://engage-site-cms.s3.amazonaws.com/production/engage-interactive/cms/processed/476ed502196619e6b8e9ebbc10349cf1.png',
            previewUrl: 'https://engage-site-cms.s3.amazonaws.com/production/engage-interactive/cms/processed/476ed502196619e6b8e9ebbc10349cf1.png',
        };

        const mockItemsArt: NftItemDto[] = [
            {
                uuid: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc0',
                type: NftItemType.Artwork,
                media: NftItemMedia.Image,
                contract: CloneUtils.clone(mockContractArt),
                index: '112',
                identifier: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc0',
                name: 'Boy of 2D',
                symbol: 'BOYOF2D',
                description: 'Let\'s find out what will happen today! Today is a day! By Musmicy © 2021',
                publisherAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                authorName: 'Musmicy',
                authorAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                ownerAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                latlong: '0,0',
                resourceUrl: 'assets/mock/g2d.jpg',
                previewUrl:  'assets/mock/g2d.jpg',
                chosen: false,
                trending: false,
                hero: true,
                price: new NftPriceDto(new NftCurrencyDto('GAS'), '10.00')
            },
            {
                uuid: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc5',
                type: NftItemType.Artwork,
                media: NftItemMedia.Image,
                contract: CloneUtils.clone(mockContractArt),
                index: '1',
                identifier: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc5',
                name: 'Ritratto di Monna Lisa',
                symbol: 'MONALISA',
                description: 'Ritratto di Monna Lisa del Giocondo Painting',
                publisherAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                authorName: 'Team11',
                authorAddress: 'NLg91vbeQXg7DMwzcg4UhYtgFdrTBNi3fG',
                ownerAddress: 'NLg91vbeQXg7DMwzcg4UhYtgFdrTBNi3fG',
                latlong: '48.860294,2.338629',
                resourceUrl: 'assets/mock/Gioconda.jpg',
                previewUrl:  'assets/mock/Gioconda.jpg',
                chosen: true,
                trending: false,
                hero: false,
                price: new NftPriceDto(new NftCurrencyDto('GAS'), '1111111.11')
            },
            {
                uuid: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc6',
                type: NftItemType.PhysicalProperty,
                media: NftItemMedia.Image,
                contract: CloneUtils.clone(mockContractArt),
                index: '2',
                identifier: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc6',
                name: 'Riga, Uriekstes 2a Office',
                symbol: 'RIXUR2A',
                description: 'Riga, Uriekstes 2a',
                publisherAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                authorName: 'Team11',
                authorAddress: 'NLg91vbeQXg7DMwzcg4UhYtgFdrTBNi3fG',
                ownerAddress: 'NLg91vbeQXg7DMwzcg4UhYtgFdrTBNi3fG',
                latlong: '56.9892084,24.1189665',
                resourceUrl: 'assets/mock/indi.jpg',
                previewUrl:  'assets/mock/indi.jpg',
                chosen: true,
                trending: true,
                hero: false,
                price: new NftPriceDto(new NftCurrencyDto('GAS'), '2.12')
            },
            {
                uuid: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc7',
                type: NftItemType.Digital,
                media: NftItemMedia.Image,
                contract: CloneUtils.clone(mockContractArt),
                index: '3',
                identifier: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc7',
                name: 'Photo of a Cat',
                symbol: 'CATCAT',
                description: 'Photo of a Cat from the Internet',
                publisherAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                authorName: 'Team11',
                authorAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                ownerAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                latlong: '',
                resourceUrl: 'assets/mock/catcat.jpg',
                previewUrl:  'assets/mock/catcat.jpg',
                chosen: false,
                trending: true,
                hero: false,
                price: new NftPriceDto(new NftCurrencyDto('GAS'), '3.00')
            },
            {
                uuid: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc8',
                type: NftItemType.Recording,
                media: NftItemMedia.Image,
                contract: CloneUtils.clone(mockContractArt),
                index: '4',
                identifier: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc8',
                name: 'Queen – Bohemian Rhapsody',
                symbol: 'QUEENBR',
                description: 'Queen – Bohemian Rhapsody Recording',
                publisherAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                authorName: 'Team11',
                authorAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                ownerAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                latlong: '',
                resourceUrl: 'assets/mock/QUEENBR.jpg',
                previewUrl:  'assets/mock/QUEENBR.jpg',
                chosen: true,
                trending: true,
                hero: false,
                price: new NftPriceDto(new NftCurrencyDto('GAS'), '4.99')
            },
            {
                uuid: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc9',
                type: NftItemType.Artwork,
                media: NftItemMedia.Image,
                contract: CloneUtils.clone(mockContractArt),
                index: '9',
                identifier: 'c0f9705c-934f-4cd4-b4c7-967018dc0bc9',
                name: 'Rihanna 2019 poster',
                symbol: 'RIH2019',
                description: 'Rihanna 2019 poster + autograph',
                publisherAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                authorName: 'Team11',
                authorAddress: 'NLg91vbeQXg7DMwzcg4UhYtgFdrTBNi3fG',
                ownerAddress: 'NLg91vbeQXg7DMwzcg4UhYtgFdrTBNi3fG',
                latlong: '',
                resourceUrl: 'assets/mock/RIH2019.jpg',
                previewUrl:  'assets/mock/RIH2019.jpg',
                chosen: false,
                trending: false,
                hero: false,
                price: new NftPriceDto(new NftCurrencyDto('GAS'), '5.55')
            },
        ];

        const mockItemsCollectible: NftItemDto[] = [
            {
                uuid: 'c0f9705c-934f-4cd4-b4c7-967018dc0bd1',
                type: NftItemType.Collectible,
                media: NftItemMedia.Raw,
                contract: CloneUtils.clone(mockContractCollectible),
                index: '6',
                identifier: 'c0f9705c-934f-4cd4-b4c7-967018dc0bd1',
                name: 'LV LP: XX-9911',
                symbol: 'XX-9911',
                description: 'Collectible: LV License plate: XX-9911',
                publisherAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                authorName: 'Team11',
                authorAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                ownerAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                latlong: '',
                resourceUrl: '',
                previewUrl:  '',
                chosen: false,
                trending: false,
                hero: false,
                price: new NftPriceDto(new NftCurrencyDto('GAS'), '6.00')
            },
            {
                uuid: 'c0f9705c-934f-4cd4-b4c7-967018dc0bd2',
                type: NftItemType.Collectible,
                media: NftItemMedia.Raw,
                contract: CloneUtils.clone(mockContractCollectible),
                index: '7',
                identifier: 'c0f9705c-934f-4cd4-b4c7-967018dc0bd2',
                name: 'LV LP: MU-2929',
                symbol: 'MU-2929',
                description: 'Collectible: LV License plate: MU-2929',
                publisherAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                authorName: 'Team11',
                authorAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                ownerAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                latlong: '',
                resourceUrl: '',
                previewUrl:  '',
                chosen: false,
                trending: false,
                hero: false,
                price: new NftPriceDto(new NftCurrencyDto('GAS'), '7.00')
            },
            {
                uuid: 'c0f9705c-934f-4cd4-b4c7-967018dc0bd3',
                type: NftItemType.Collectible,
                media: NftItemMedia.Raw,
                contract: CloneUtils.clone(mockContractCollectible),
                index: '8',
                identifier: 'c0f9705c-934f-4cd4-b4c7-967018dc0bd3',
                name: 'USA LP: CALIFORNIA',
                symbol: 'CALIFORNIA',
                description: 'Collectible: USA License plate: CALIFORNIA',
                publisherAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                authorName: 'Team11',
                authorAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                ownerAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                latlong: '',
                resourceUrl: '',
                previewUrl:  '',
                chosen: false,
                trending: false,
                hero: false,
                price: new NftPriceDto(new NftCurrencyDto('GAS'), '8.05')
            },
        ];

        const mockItemsDomain: NftItemDto[] = [
            {
                uuid: 'c0f9705c-934f-4cd4-b4c7-967018dc0bd4',
                type: NftItemType.Domain,
                media: NftItemMedia.Raw,
                contract: CloneUtils.clone(mockContractDomain),
                index: '5',
                identifier: 'c0f9705c-934f-4cd4-b4c7-967018dc0bd4',
                name: 'vodka.com',
                symbol: 'VodkaCom Domain',
                description: 'Vodka.com domain name',
                publisherAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                authorName: 'Team11',
                authorAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                ownerAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                latlong: '',
                resourceUrl: 'https://vodka.com/',
                previewUrl:  'assets/mock/vodka.jpg',
                chosen: false,
                trending: false,
                hero: false,
                price: new NftPriceDto(new NftCurrencyDto('GAS'), '9.00')
            },
        ];

        const mockItemsMeme: NftItemDto[] = [
            {
                uuid: 'c0f9705c-934f-4cd4-b4c7-967018dc0bd5',
                type: NftItemType.Meme,
                media: NftItemMedia.Image,
                contract: CloneUtils.clone(mockContractMeme),
                index: '0',
                identifier: 'c0f9705c-934f-4cd4-b4c7-967018dc0bd5',
                name: 'Nyan Cat GIF',
                symbol: 'NYANCAT',
                description: 'Nyan Cat GIF Meme',
                publisherAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                authorName: 'Team11',
                authorAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                ownerAddress: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP',
                latlong: '',
                resourceUrl: 'assets/mock/NYANCAT.gif',
                previewUrl:  'assets/mock/NYANCAT.gif',
                chosen: false,
                trending: false,
                hero: false,
                price: new NftPriceDto(new NftCurrencyDto('GAS'), '10.99')
            },
        ];
        
        mockContractArt.items = mockItemsArt;
        mockContractCollectible.items = mockItemsCollectible;
        mockContractDomain.items = mockItemsDomain;
        mockContractMeme.items = mockItemsMeme;

        this.mockContracts = [mockContractArt, mockContractCollectible, mockContractDomain, mockContractMeme];
    }

    async getSuperCategories(): Promise<NftSuperCategoryDto[]> {
        // TODO: Seed Super Categories
        // const superCategories = await this.nftSuperCategoryRepository.find();
        // const dtos = superCategories.map(NftSuperCategoryDto.from);
        // return dtos;
        
        // Mock Super Categories
        return this.mockSuperCategories;
    }

    async getCategories(): Promise<NftCategoryDto[]> {
        // TODO: Seed Categories
        // const categories = await this.nftCategoryRepository.find();
        // const dtos = categories.map(NftCategoryDto.from);
        // return dtos;
        
        // Mock Categories
        return this.mockCategories;
    }

    async getAllContracts(): Promise<NftContractDto[]> {
        const contracts = await this.nftContractRepository.find({ relations:['items'] });
        console.dir(contracts);
        const dtos = contracts.map(NftContractDto.from);
        
        // Mock Contracts
        return [...this.mockContracts, ...dtos];
    }

    async getContract(identifier: string): Promise<NftContractDto> {
        const contract = await this.nftContractRepository.findOne({ identifier }, { relations:['items'] });
        if (contract) {
            const dto = NftContractDto.from(contract);
            return dto;
        }

        // Mock Contract
        return this.mockContracts.find(i => i.identifier === identifier);
    }

    async getAllItems(): Promise<NftItemDto[]> {
        const items = await this.nftItemRepository.find({ relations:['contract'] });
        const dtos = items.map(NftItemDto.from);

        // Mock items
        const mockItems = this.mockContracts.flatMap(c => c.items);
        return [...mockItems, ...dtos];
    }

    async getItem(identifier: string): Promise<NftItemDto> {
        const item = await this.nftItemRepository.findOne({ identifier }, { relations:['contract'] });
        if (item) {
            const dto = NftItemDto.from(item);
            return dto;
        }

        // Mock item
        const mockItem = this.mockContracts.flatMap(c => c.items)?.find(i => i.identifier === identifier);

        return mockItem;
    }

    async getOwnItems(address: string): Promise<NftItemDto[]> {
        const items = await this.nftItemRepository.find({
            where: {
                publisherAddress: address
            }
        });
        const dtos = items.map(NftItemDto.from);
        return dtos;
    }

    async getChosenItems(): Promise<NftItemDto[]> {
        // TODO: Connect DB here
        // const items = await this.nftItemRepository.find({
        //     where: {
        //         chosen: true
        //     }
        // });
        // const dtos = items.map(NftItemDto.from);
        // return dtos;

        // Mock items
        return this.mockContracts.flatMap(c => c.items)?.filter(i => i.chosen);
    }

    async getTrendingItems(): Promise<NftItemDto[]> {
        // TODO: Connect DB here
        // const items = await this.nftItemRepository.find({
        //     where: {
        //         trending: true
        //     }
        // });
        // const dtos = items.map(NftItemDto.from);
        // return dtos;

        // Mock items
        return this.mockContracts.flatMap(c => c.items)?.filter(i => i.trending);
    }

    async getHeroItems(): Promise<NftItemDto[]> {
        // TODO: Connect DB here
        // const items = await this.nftItemRepository.find({
        //     where: {
        //         hero: true
        //     }
        // });
        // const dtos = items.map(NftItemDto.from);
        // return dtos;
        
        // Mock items
        return this.mockContracts.flatMap(c => c.items)?.filter(i => i.hero);
    }
}