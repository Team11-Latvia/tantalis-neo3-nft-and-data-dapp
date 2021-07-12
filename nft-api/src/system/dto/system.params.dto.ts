import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SystemParamsEntity } from "../../entity/system.params.entity";

export class SystemParamsDto {
    @ApiProperty()
    uuid: string;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    key: string;

    @ApiPropertyOptional({ nullable: true })
    value?: any;

    static from(entity: SystemParamsEntity): SystemParamsDto {
        const dto: SystemParamsDto = {
            uuid: entity.uuid,
            active: entity.active,
            key: entity.key,
            value: entity.serializedValue ? JSON.parse(entity.serializedValue) : entity.serializedValue
        };
        return dto;
    }
}