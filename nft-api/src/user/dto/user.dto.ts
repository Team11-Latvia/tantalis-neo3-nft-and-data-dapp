import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserEntity } from "../../entity/user.entity";

export class UserDto {
    @ApiProperty({ nullable: true })
    id: number;

    @ApiProperty()
    uuid: string;

    @ApiProperty()
    address: string;

    @ApiPropertyOptional({ nullable: true })
    name?: string;

    @ApiProperty()
    locked: boolean;

    @ApiHideProperty()
    createdDate: Date;

    @ApiHideProperty()
    modifiedDate: Date;

    public static from(entity: UserEntity): UserDto {
        const dto: UserDto = {
            id: entity.id,
            uuid: entity.uuid,
            address: entity.address,
            name: entity.name,
            locked: entity.locked,
            createdDate: entity.createdDate,
            modifiedDate: entity.modifiedDate
        };
        return dto;
    }
}