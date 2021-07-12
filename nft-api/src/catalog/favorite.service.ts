import { Injectable } from '@nestjs/common';
import { NftItemDto } from './dto/nft.item.dto';
import { NftItemFavoriteRepository } from './repository/nft.item.favorite.repository';

@Injectable()
export class FavoriteService {
    constructor(
        private readonly nftItemFavoriteRepository: NftItemFavoriteRepository
    ) {
    }

    async getFavoriteItems(address: string): Promise<NftItemDto[]> {
        const favorites = await this.nftItemFavoriteRepository.find({
            where: {
                address
            }
        });
        const dtos = favorites.map(f => NftItemDto.from(f.item));
        return dtos;
    }

    async markFavoriteItem(address: string, dto: NftItemDto): Promise<NftItemDto> {
        return dto;
    }

    async unmarkFavoriteItem(address: string, identifier: string): Promise<NftItemDto> {
        return null;
    }
}