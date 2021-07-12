import { Column, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { NftCurrencyEntity } from './nft.currency.entity';
import { NftItemEntity } from './nft.item.entity';

@Entity('nft_bid')
export class NftBidInfoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Generated('uuid')
    @Column({ unique: true, nullable: false })
    uuid: string;

    @ManyToOne(type => NftCurrencyEntity)
    currency: NftCurrencyEntity;

    @Column({ unique: false, nullable: false })
    bidPrice: string;

    @ManyToOne(type => NftItemEntity, item => item.bids)
    item: NftItemEntity;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    modifiedDate: Date;
}