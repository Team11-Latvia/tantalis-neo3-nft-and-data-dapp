import { ApiProperty } from '@nestjs/swagger';
import { NftItemType } from '../../entity/nft.item.entity';
import { NftContractEntity, NftContractType } from '../../entity/nft.contract.entity';
import { NftCategoryDto } from './nft.category.dto';
import { NftItemDto } from './nft.item.dto';

export class NftContractDto {
    @ApiProperty()
    uuid: string;

    @ApiProperty()
    type: NftContractType;

    @ApiProperty()
    category: NftCategoryDto;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    publisherAddress: string;

    @ApiProperty()
    identifier: string;

    @ApiProperty()
    symbol: string;

    @ApiProperty()
    decimals?: string;

    @ApiProperty()
    totalSupply?: string;

    @ApiProperty()
    balance?: string;

    @ApiProperty()
    items: NftItemDto[];

    @ApiProperty()
    contractAddress?: string;

    @ApiProperty()
    resourceUrl?: string;

    @ApiProperty()
    previewUrl?: string;

    @ApiProperty()
    createdTxHash?: string;

    @ApiProperty()
    creatorAddress?: string;

    constructor(
        uuid: string,
        type: NftContractType,
        category: NftCategoryDto,
        name: string,
        description: string,
        publisherAddress: string,
        identifier: string,
        symbol: string,
        decimals?: string,
        totalSupply?: string,
        balance?: string,
        items?: NftItemDto[],
        contractAddress?: string,
        createdTxHash?: string,
        creatorAddress?: string,
        resourceUrl?: string,
        previewUrl?: string
    ) {
        this.uuid = uuid;
        this.type = type;
        this.category = category;
        this.name = name;
        this.description = description;
        this.publisherAddress = publisherAddress;
        this.identifier = identifier;
        this.symbol = symbol;
        this.decimals = decimals;
        this.totalSupply = totalSupply;
        this.balance = balance;
        this.items = items ?? [];
        this.contractAddress = contractAddress;
        this.createdTxHash = createdTxHash;
        this.creatorAddress = creatorAddress;
        this.resourceUrl = resourceUrl;
        this.previewUrl = previewUrl;
    }

    static from(entity: NftContractEntity): NftContractDto {
        const dto: NftContractDto = {
            uuid: entity.uuid,
            type: entity.type,
            category: entity.category ? NftCategoryDto.from(entity.category) : NftCategoryDto.fromNftItemType(NftItemType.Other),
            name: entity.name,
            description: entity.description,
            publisherAddress: entity.publisherAddress,
            identifier: entity.identifier,
            symbol: entity.symbol,
            decimals: entity.decimals,
            totalSupply: entity.totalSupply,
            balance: entity.balance,
            items: entity.items ? entity.items.map(NftItemDto.from) : [],
            contractAddress: entity.contractAddress,
            createdTxHash: entity.createdTxHash,
            creatorAddress: entity.creatorAddress,
            resourceUrl: entity.resourceUrl,
            previewUrl: entity.previewUrl,
        };
        return dto;
    }
}