import { Column, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, ManyToOne } from 'typeorm';
import { NftContractEntity } from './nft.contract.entity';
import { NftItemEntity, NftItemMedia, NftItemType } from './nft.item.entity';

export enum CreateNftItemState {
    NEW = 'NEW',
    ANNOUNCED = 'ANNOUNCED',
    CONFIRMED = 'CONFIRMED',
    FAILED = 'FAILED',
    CANCELED = 'CANCELED'
}

@Entity('create_nft_item')
export class CreateNftItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Generated('uuid')
    @Column({ unique: true, nullable: false })
    uuid: string;

    @Column({ unique: false, nullable: false, enum: CreateNftItemState, default: CreateNftItemState.NEW })
    state: CreateNftItemState;

    @Index()
    @Column({ unique: false, nullable: false })
    publisherAddress: string;

    @Column({ unique: false, nullable: false, default: false })
    createNew: boolean;

    @Index()
    @Column({ unique: false, nullable: false, enum: NftItemType })
    type: NftItemType;

    @Column({ unique: false, nullable: false, enum: NftItemMedia })
    media: NftItemMedia;

    @Index()
    @Column({ unique: false, nullable: true })
    createdTxHash?: string;

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

    @Column({ unique: false, nullable: true })
    authorName?: string;

    @Index()
    @Column({ unique: false, nullable: false })
    authorAddress: string;

    @Column({ unique: false, nullable: true })
    latlong?: string;

    @Column({ unique: false, nullable: true })
    resourceUrl?: string;

    @Column({ unique: false, nullable: true })
    previewUrl?: string;

    @Column({ nullable: false, default: false })
    chosen: boolean;

    @Column({ nullable: false, default: false })
    trending: boolean;

    @OneToOne(type => NftContractEntity, { nullable: true, cascade: true })
    contract?: NftContractEntity;

    @OneToOne(type => NftItemEntity, { nullable: true, cascade: true })
    item?: NftItemEntity;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    modifiedDate: Date;
}
