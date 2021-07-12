import { NftItemNetworkType } from "./nft.item.dto";

export class NftSuperCategoryDto {
    name: string;
    description: string;
    selected?: boolean;
    
    constructor(
        name: string,
        description: string,
        selected?: boolean
    ) {
        this.name = name;
        this.description = description;
        this.selected = selected;
    }

    static allCategory(): NftSuperCategoryDto {
        return new NftSuperCategoryDto('All', 'All');
    }

    static fromNftItemTypes(): NftSuperCategoryDto[] {
        return Object.keys(NftItemNetworkType).map(t => new NftSuperCategoryDto(t, t));
    }
}