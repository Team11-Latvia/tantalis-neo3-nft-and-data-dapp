import { NftCategoryDto } from "./nft.category.dto";
import { NftItemDto } from "./nft.item.dto";

export enum NftContractType {
    ERC721 = 'ERC721',
    NEP11 = 'NEP11'
}

export class NftContractDto {
    uuid: string;

    type: NftContractType;

    category: NftCategoryDto;

    name: string;
    description: string;

    identifier: string;
    symbol: string;

    decimals?: string;
    totalSupply?: string;
    balance?: string;

    items: NftItemDto[];

    contractAddress?: string;
    createdTxHash?: string;
    creatorAddress?: string;

    publisherAddress?: string;
    previewUrl?: string;

    constructor(
        uuid: string,
        type: NftContractType,
        category: NftCategoryDto,
        name: string,
        description: string,
        identifier: string,
        symbol: string,
        decimals?: string,
        totalSupply?: string,
        balance?: string,
        items?: NftItemDto[],
        contractAddress?: string,
        createdTxHash?: string,
        creatorAddress?: string
    ) {
        this.uuid = uuid;
        this.type = type;
        this.category = category;
        this.name = name;
        this.description = description;
        this.identifier = identifier;
        this.symbol = symbol;
        this.decimals = decimals;
        this.totalSupply = totalSupply;
        this.balance = balance;
        this.items = items ?? [];
        this.contractAddress = contractAddress;
        this.createdTxHash = createdTxHash;
        this.creatorAddress = creatorAddress;
    }
}