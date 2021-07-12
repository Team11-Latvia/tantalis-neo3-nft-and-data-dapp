import { ApiProperty } from "@nestjs/swagger";
import { NftItemNetworkType } from "../../entity/nft.item.entity";

export class NftSuperCategoryDto {
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

    static allCategory(): NftSuperCategoryDto {
        return new NftSuperCategoryDto('All', 'All');
    }

    static fromNftItemTypes(): NftSuperCategoryDto[] {
        return Object.keys(NftItemNetworkType).map(t => new NftSuperCategoryDto(t, t));
    }
}