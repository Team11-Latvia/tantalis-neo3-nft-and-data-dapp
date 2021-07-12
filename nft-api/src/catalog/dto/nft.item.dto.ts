import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { NftPriceEntity } from "../../entity/nft.price.entity";
import { NftCurrencyEntity } from "../../entity/nft.currency.entity";
import { NftItemEntity, NftItemMedia, NftItemType } from "../../entity/nft.item.entity";
import { NftContractDto } from "./nft.contract.dto";
import { NftBidInfoEntity } from "../../entity/nft.bid.info.entity";
import { NftItemFavoriteDto } from "./nft.item.favorite.dto";

export class NftCurrencyDto {
    code: string;
    name?: string;
    label?: string;

    constructor(code: string, name?: string, label?: string) {
        this.code = code;
        this.name = name;
        this.label = label;
    }

    static from(entity: NftCurrencyEntity): NftCurrencyDto {
        const dto: NftCurrencyDto = {
            code: entity.code,
            name: entity.name,
            label: entity.label
        };
        return dto;
    }
}

export class NftPriceDto {
    public static readonly Default = new NftPriceDto(new NftCurrencyDto('GAS'), '10.00');

    currency: NftCurrencyDto;
    price: string;

    constructor(currency: NftCurrencyDto, price: string) {
        this.currency = currency;
        this.price = price;
    }

    static from(entity: NftPriceEntity): NftPriceDto {
        const dto: NftPriceDto = {
            currency: entity?.currency ? NftCurrencyDto.from(entity.currency) : undefined,
            price: entity?.price,
        };
        return dto;
    }
}

export class NftBidInfoDto {
    currency: NftCurrencyDto;
    bidPrice: string;

    constructor(currency: NftCurrencyDto, bidPrice: string) {
        this.currency = currency;
        this.bidPrice = bidPrice;
    }

    static from(entity: NftBidInfoEntity): NftBidInfoDto {
        const dto: NftBidInfoDto = {
            currency: entity?.currency ? NftCurrencyDto.from(entity.currency) : undefined,
            bidPrice: entity?.bidPrice,
        };
        return dto;
    }
}

export class NftItemDto {
    @ApiProperty()
    uuid: string;

    @ApiProperty()
    type: NftItemType;

    @ApiProperty()
    media: NftItemMedia;

    @ApiProperty({ type: () => NftContractDto })
    contract: NftContractDto;

    @ApiPropertyOptional()
    createdTxHash?: string;

    @ApiPropertyOptional()
    index?: string;

    @ApiProperty()
    identifier: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    symbol: string;

    @ApiPropertyOptional()
    description?: string;

    @ApiProperty()
    publisherAddress: string;

    @ApiPropertyOptional()
    authorName?: string;

    @ApiProperty()
    authorAddress: string;

    @ApiProperty()
    ownerAddress: string;

    @ApiPropertyOptional()
    latlong?: string;

    @ApiPropertyOptional()
    resourceUrl?: string;

    @ApiPropertyOptional()
    previewUrl?: string;

    @ApiPropertyOptional({ type: () => NftItemFavoriteDto })
    favorite?: NftItemFavoriteDto;

    @ApiProperty()
    chosen: boolean;

    @ApiProperty()
    trending: boolean;

    @ApiProperty()
    hero: boolean;

    @ApiPropertyOptional()
    price?: NftPriceDto;

    @ApiPropertyOptional()
    bids?: NftBidInfoDto[];

    constructor(
        uuid: string,
        type: NftItemType,
        media: NftItemMedia,
        contract: NftContractDto,
        createdTxHash: string,
        index: string,
        identifier: string,
        name: string,
        symbol: string,
        description: string,
        publisherAddress: string,
        authorName: string,
        authorAddress: string,
        ownerAddress: string,
        latlong: string,
        resourceUrl: string,
        previewUrl: string,
        favorite: NftItemFavoriteDto,
        chosen: boolean,
        trending: boolean,
        hero: boolean,
        price?: NftPriceDto,
        bids?: NftBidInfoDto[]
    ) {
        this.uuid = uuid;
        this.type = type;
        this.media = media;
        this.contract = contract;
        this.createdTxHash = createdTxHash;
        this.index = index;
        this.identifier = identifier;
        this.name = name;
        this.symbol = symbol;
        this.description = description;
        this.publisherAddress = publisherAddress;
        this.authorName = authorName;
        this.authorAddress = authorAddress;
        this.ownerAddress = ownerAddress;
        this.latlong = latlong;
        this.resourceUrl = resourceUrl;
        this.previewUrl = previewUrl;
        this.favorite = favorite;
        this.chosen = chosen;
        this.trending = trending;
        this.hero = hero;
        this.price = price;
        this.bids = bids;
    }

    public static from(entity: NftItemEntity): NftItemDto {
        const dto: NftItemDto = {
            uuid: entity.uuid,
            type: entity.type,
            media: entity.media,
            contract: entity.contract ? NftContractDto.from(entity.contract) : undefined,
            createdTxHash: entity.createdTxHash,
            index: entity.index,
            identifier: entity.identifier,
            name: entity.name,
            symbol: entity.symbol,
            description: entity.description,
            publisherAddress: entity.publisherAddress,
            authorName: entity.authorName,
            authorAddress: entity.authorAddress,
            ownerAddress: entity.ownerAddress,
            latlong: entity.latlong,
            resourceUrl: entity.resourceUrl,
            previewUrl: entity.previewUrl,
            chosen: entity.chosen,
            trending: entity.trending,
            hero: entity.hero,
            favorite: entity.favorite ? NftItemFavoriteDto.from(entity.favorite) : undefined,
            price: entity.price ? NftPriceDto.from(entity.price) : NftPriceDto.Default ,
            bids: entity.bids ? entity.bids.map(NftBidInfoDto.from) : undefined
        };
        return dto;
    }
}
