import { Injectable } from "@nestjs/common";
import { NftItemRepository } from "../catalog/repository/nft.item.repository";
import { NftItemDto } from "../catalog/dto/nft.item.dto";
import { SellNftItemResultDto } from "./dto/sell.nft.item.result.dto";
import { NftPriceRepository } from "../catalog/repository/nft.price.repository";

@Injectable()
export class SellService {
    constructor(
        private readonly nftItemRepository: NftItemRepository,
        private readonly nftPriceRepository: NftPriceRepository
    ) {
    }

    async sellItem(address: string, identifier: string, dto: NftItemDto): Promise<SellNftItemResultDto> {
        return new SellNftItemResultDto(identifier);
    }

    async setPriceItem(address: string, identifier: string, dto: NftItemDto): Promise<SellNftItemResultDto> {
        const item = await this.nftItemRepository.findOneOrFail({ identifier }, { relations: ['price'] });
        item.price = this.nftPriceRepository.create(dto.price);
        const saved = await this.nftItemRepository.save(item);
        return new SellNftItemResultDto(identifier);
    }
}