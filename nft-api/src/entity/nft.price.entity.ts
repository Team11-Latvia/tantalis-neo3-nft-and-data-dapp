import { Column, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, ManyToOne } from 'typeorm';
import { NftCurrencyEntity } from './nft.currency.entity';
import { NftItemEntity } from './nft.item.entity';

@Entity('nft_price')
export class NftPriceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Generated('uuid')
    @Column({ unique: true, nullable: false })
    uuid: string;

    @ManyToOne(type => NftCurrencyEntity)
    currency: NftCurrencyEntity;

    @Column({ unique: false, nullable: false })
    price: string;

    @OneToOne(type => NftItemEntity, item => item.price)
    item: NftItemEntity;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    modifiedDate: Date;
}