import { Column, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('system_params')
export class SystemParamsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Generated('uuid')
    @Column({ unique: true, nullable: false })
    uuid: string;

    @Index()
    @Column({ unique: false, nullable: false, default: true })
    active: boolean;

    @Index()
    @Column({ unique: true, nullable: false })
    key: string;

    @Column({ unique: false, nullable: true })
    serializedValue?: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    modifiedDate: Date;
}