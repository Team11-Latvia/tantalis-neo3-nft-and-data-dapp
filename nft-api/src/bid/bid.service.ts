import { Injectable, NotFoundException } from "@nestjs/common";
import { NftBidInfoDto } from "../catalog/dto/nft.item.dto";
import { NftItemRepository } from "../catalog/repository/nft.item.repository";
import { BidNftItemResultDto } from "./dto/bid.nft.item.result.dto";
import { NftBidInfoRepository } from "./nft.bid.info.repository";

@Injectable()
export class BidService {
    constructor(
        private readonly nftItemRepository: NftItemRepository,
        private readonly nftBidInfoRepository: NftBidInfoRepository
    ) {
    }

    async getCurrentBid(identifier: string): Promise<NftBidInfoDto> {
        const item = await this.nftItemRepository.findOneOrFail({ identifier });
        if (!item.bids || item.bids.length <= 0) {
            throw new NotFoundException('Bids not found');
        }

        const current = item.bids[item.bids.length - 1];

        return NftBidInfoDto.from(current);
    }

    async getBidHistory(identifier: string): Promise<NftBidInfoDto[]> {
        const item = await this.nftItemRepository.findOneOrFail({ identifier });
        const dtos = item.bids?.map(NftBidInfoDto.from);
        return dtos;
    }

    async bidItem(address: string, identifier: string, dto: NftBidInfoDto): Promise<BidNftItemResultDto> {
        return undefined;
    }
}