import { Column, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('auth_info')
export class AuthInfoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Generated('uuid')
    @Column({ unique: true, nullable: false })
    uuid: string;

    @Index()
    @Column({ unique: true, nullable: false })
    publicKey: string;

    @Index()
    @Column({ unique: true, nullable: false })
    address: string;

    @Index()
    @Column({ unique: false, nullable: true })
    email?: string;

    @Index()
    @Column({ unique: true, nullable: false })
    signature: string;

    @Column({ unique: false, nullable: false })
    lastLogin: Date;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    modifiedDate: Date;
}