import { NftContractDto } from "./nft.contract.dto";

export enum NftItemMedia {
    Raw = 'Raw',
    Pdf = 'Pdf',
    Image = 'Image',
    Audio = 'Audio',
    Video = 'Video'
}

export enum NftItemNetworkType {
    NEO = 'NEO',
    DVITA = 'DVITA',
    Ethereum = 'Ethereum',
    Binance = 'Binance',
    Cardano = 'Cardano',
    Eos = 'Eos',
}

export enum NftItemType {
    Digital = 'Digital',
    Domain = 'Domain',
    Collectible = 'Collectible',
    Sport = 'Sport',
    Fashion = 'Fashion',
    Artwork = 'Artwork',
    Recording = 'Recording',
    Film = 'Film',
    Writing = 'Writing',
    InGame = 'InGame',
    Meme = 'Meme',
    Ticket = 'Ticket',
    Coupon = 'Coupon',
    PhysicalProperty = 'PhysicalProperty',
    Tokenized = 'Tokenized',
    Other = 'Other'
}

export class NftCurrencyDto {
    code: string;
    name?: string;
    label?: string;

    constructor(code: string, name?: string, label?: string) {
        this.code = code;
        this.name = name;
        this.label = label;
    }
}

export class NftPriceDto {
    currency: NftCurrencyDto;
    price: string;

    constructor(currency: NftCurrencyDto, price: string) {
        this.currency = currency;
        this.price = price;
    }
}

export class NftBidInfoDto {
    currency: NftCurrencyDto;
    bidPrice: string;

    constructor(currency: NftCurrencyDto, bidPrice: string) {
        this.currency = currency;
        this.bidPrice = bidPrice;
    }
}

export class NftItemDto {
    uuid: string;

    type: NftItemType;
    media: NftItemMedia;

    contract: NftContractDto;

    index: string;
    identifier: string;

    name: string;
    symbol: string;
    description: string;

    authorName: string;
    authorAddress: string;
    ownerAddress: string;

    latlong?: string;
    resourceUrl?: string;
    previewUrl?: string;

    price?: NftPriceDto;
    bids?: NftBidInfoDto[];

    constructor(
        uuid: string,
        type: NftItemType,
        media: NftItemMedia,
        contract: NftContractDto,
        index: string,
        identifier: string,
        name: string,
        symbol: string,
        description: string,
        authorName: string,
        authorAddress: string,
        ownerAddress: string,
        latlong?: string,
        resourceUrl?: string,
        previewUrl?: string,
        price?: NftPriceDto,
        bids?: NftBidInfoDto[]
    ) {
        this.uuid = uuid;
        this.type = type;
        this.media = media;
        this.contract = contract;
        this.index = index;
        this.identifier = identifier;
        this.name = name;
        this.symbol = symbol;
        this.description = description;
        this.authorName = authorName;
        this.authorAddress = authorAddress;
        this.ownerAddress = ownerAddress;
        this.latlong = latlong;
        this.resourceUrl = resourceUrl;
        this.previewUrl = previewUrl;
        this.price = price;
        this.bids = bids;
    }
}
