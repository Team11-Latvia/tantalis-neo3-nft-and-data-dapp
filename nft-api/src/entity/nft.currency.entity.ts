import { Column, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('nft_currency')
export class NftCurrencyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Generated('uuid')
    @Column({ unique: true, nullable: false })
    uuid: string;

    @Index()
    @Column({ unique: true, nullable: false })
    code: string;

    @Column({ unique: false, nullable: true })
    name?: string;

    @Column({ unique: false, nullable: true })
    label?: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    modifiedDate: Date;
}