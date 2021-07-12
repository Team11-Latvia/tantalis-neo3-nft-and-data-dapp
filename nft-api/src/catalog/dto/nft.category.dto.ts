import { ApiProperty } from "@nestjs/swagger";
import { NftItemType } from "../../entity/nft.item.entity";
import { NftCategoryEntity } from "../../entity/nft.category.entity";

export class NftCategoryDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;
    
    constructor(
        name: string,
        description: string
    ) {
        this.name = name;
        this.description = description;
    }

    static allCategory(): NftCategoryDto {
        return new NftCategoryDto('All', 'All');
    }

    static fromNftItemType(type: NftItemType): NftCategoryDto {
        return new NftCategoryDto(type.toString(), type.toString());
    }

    static fromNftItemTypes(): NftCategoryDto[] {
        return Object.keys(NftItemType).map(t => new NftCategoryDto(t, t));
    }

    public static from(entity: NftCategoryEntity): NftCategoryDto {
        const dto: NftCategoryDto = {
            name: entity.name,
            description: entity.description
        };
        return dto;
    }
}