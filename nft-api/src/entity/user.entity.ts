import { Column, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserDto } from '../user/dto/user.dto';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Generated('uuid')
    @Column({ unique: true, nullable: false })
    uuid: string;

    @Index()
    @Column({ unique: true, nullable: false })
    address: string;

    @Index()
    @Column({ unique: false, nullable: true })
    name?: string;

    @Column({ nullable: false, default: false })
    locked: boolean;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    modifiedDate: Date;

    public static from(dto: UserDto): Partial<UserEntity> {
        const entity: Partial<UserEntity> = {
            id: dto.id,
            uuid: dto.uuid,
            address: dto.address,
            name: dto.name,
            locked: dto.locked,
        };
        return entity;
    }
}