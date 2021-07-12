import {
    Column, CreateDateColumn, Entity, Generated, Index,
    PrimaryGeneratedColumn, UpdateDateColumn,
    OneToOne, OneToMany, ManyToOne
} from 'typeorm';
import { NftBidInfoEntity } from './nft.bid.info.entity';
import { NftContractEntity } from './nft.contract.entity';
import { NftItemFavoriteEntity } from './nft.item.favorite.entity';
import { NftPriceEntity } from './nft.price.entity';

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

@Entity('nft_item')
export class NftItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Generated('uuid')
    @Column({ unique: true, nullable: false })
    uuid: string;

    @Index()
    @Column({ unique: false, nullable: false, enum: NftItemType })
    type: NftItemType;

    @Column({ unique: false, nullable: false, enum: NftItemMedia })
    media: NftItemMedia;

    @ManyToOne(type => NftContractEntity, contract => contract.items)
    contract: NftContractEntity;

    @Index()
    @Column({ unique: false, nullable: true })
    createdTxHash?: string;

    @Column({ unique: false, nullable: true })
    index?: string;

    @Index()
    @Generated('uuid')
    @Column({ unique: true, nullable: false })
    identifier: string;

    @Column({ unique: false, nullable: false })
    name: string;

    @Index()
    @Column({ unique: false, nullable: false })
    symbol: string;

    @Column({ unique: false, nullable: true })
    description?: string;

    @Index()
    @Column({ unique: false, nullable: false })
    publisherAddress: string;

    @Column({ unique: false, nullable: true })
    authorName?: string;

    @Index()
    @Column({ unique: false, nullable: false })
    authorAddress: string;

    @Index()
    @Column({ unique: false, nullable: false })
    ownerAddress: string;

    @Column({ unique: false, nullable: true })
    latlong?: string;

    @Column({ unique: false, nullable: true })
    resourceUrl?: string;

    @Column({ unique: false, nullable: true })
    previewUrl?: string;

    @OneToOne(type => NftPriceEntity, price => price.item , { nullable: true, cascade: true })
    price?: NftPriceEntity;

    @OneToMany(type => NftBidInfoEntity, bid => bid.item, { nullable: true, cascade: true })
    bids?: NftBidInfoEntity[];

    @OneToOne(type => NftItemFavoriteEntity, { nullable: true })
    favorite?: NftItemFavoriteEntity;

    @Column({ nullable: false, default: false })
    chosen: boolean;

    @Column({ nullable: false, default: false })
    trending: boolean;

    @Column({ nullable: false, default: false })
    hero: boolean;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    modifiedDate: Date;
}