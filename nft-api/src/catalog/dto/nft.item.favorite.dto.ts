import { ApiProperty } from "@nestjs/swagger";
import { NftItemFavoriteEntity } from "../../entity/nft.item.favorite.entity";
import { NftItemDto } from "./nft.item.dto";

export class NftItemFavoriteDto {
    @ApiProperty()
    uuid: string;

    @ApiProperty()
    address: string;

    @ApiProperty({ type: () => NftItemDto })
    item: NftItemDto;

    public static from(entity: NftItemFavoriteEntity): NftItemFavoriteDto {
        const dto: NftItemFavoriteDto = {
            uuid: entity.uuid,
            address: entity.address,
            item: NftItemDto.from(entity.item)
        };
        return dto;
    }
}