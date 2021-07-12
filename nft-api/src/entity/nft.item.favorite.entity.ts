import { Column, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { NftItemFavoriteDto } from '../catalog/dto/nft.item.favorite.dto';
import { NftItemEntity } from './nft.item.entity';

@Entity('nft_favorite_item')
export class NftItemFavoriteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Generated('uuid')
    @Column({ unique: true, nullable: false })
    uuid: string;

    @Index()
    @Column({ unique: true, nullable: false })
    address: string;

    @OneToOne(type => NftItemEntity, { nullable: false })
    item: NftItemEntity;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    modifiedDate: Date;
}