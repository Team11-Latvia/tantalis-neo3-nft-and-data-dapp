import { Column, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { NftCategoryEntity } from './nft.category.entity';
import { NftItemEntity } from './nft.item.entity';

export enum NftContractType {
    ERC721 = 'ERC721',
    NEP11 = 'NEP11'
}

@Entity('nft_contract')
export class NftContractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Generated('uuid')
    @Column({ unique: true, nullable: false })
    uuid: string;

    @Index()
    @Column({ unique: false, nullable: false, enum: NftContractType })
    type: NftContractType;

    @Index()
    @ManyToOne(type => NftCategoryEntity, category => category.contracts)
    category: NftCategoryEntity;

    @Column({ unique: false, nullable: false })
    name: string;

    @Column({ unique: false, nullable: true })
    description: string;

    @Index()
    @Column({ unique: false, nullable: false })
    publisherAddress: string;

    @Index()
    @Generated('uuid')
    @Column({ unique: true, nullable: false })
    identifier: string;

    @Index()
    @Column({ unique: false, nullable: false })
    symbol: string;

    @Column({ unique: false, nullable: true })
    decimals?: string;

    @Column({ unique: false, nullable: true })
    totalSupply?: string;

    @Column({ unique: false, nullable: true })
    balance?: string;

    @OneToMany(type => NftItemEntity, item => item.contract, { nullable: true, cascade: true })
    items: NftItemEntity[];

    @Index()
    @Column({ unique: false, nullable: true })
    contractAddress?: string;

    @Index()
    @Column({ unique: false, nullable: true })
    createdTxHash?: string;

    @Index()
    @Column({ unique: false, nullable: true })
    creatorAddress?: string;

    @Column({ unique: false, nullable: true })
    resourceUrl?: string;

    @Column({ unique: false, nullable: true })
    previewUrl?: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    modifiedDate: Date;
}