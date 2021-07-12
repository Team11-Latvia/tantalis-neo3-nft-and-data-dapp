import { Column, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { NftCategoryDto } from '../catalog/dto/nft.category.dto';
import { NftContractEntity } from './nft.contract.entity';

@Entity('nft_category')
export class NftCategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Generated('uuid')
    @Column({ unique: true, nullable: false })
    uuid: string;

    @Index()
    @Column({ unique: true, nullable: false })
    name: string;

    @Column({ unique: false, nullable: true })
    description?: string;

    @OneToMany(type => NftContractEntity, contract => contract.category)
    contracts: NftContractEntity[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    modifiedDate: Date;
}