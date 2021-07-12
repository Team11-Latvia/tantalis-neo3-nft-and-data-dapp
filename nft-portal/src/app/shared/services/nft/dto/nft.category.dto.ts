import { NftItemType } from "./nft.item.dto";

export class NftCategoryDto {
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

    static allCategory(selected?: boolean): NftCategoryDto {
        return new NftCategoryDto('All', 'All', selected);
    }

    static fromNftItemType(type: NftItemType): NftCategoryDto {
        return new NftCategoryDto(type.toString(), type.toString());
    }

    static fromNftItemTypes(): NftCategoryDto[] {
        return Object.keys(NftItemType).map(t => new NftCategoryDto(t, t));
    }
}