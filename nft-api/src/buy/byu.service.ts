import { Injectable } from "@nestjs/common";
import { NftItemDto } from "../catalog/dto/nft.item.dto";
import { BuyNftItemResultDto } from "./dto/buy.nft.item.result.dto";

@Injectable()
export class BuyService {
    async buyItem(address: string, identifier: string, dto: NftItemDto): Promise<BuyNftItemResultDto> {
        return new BuyNftItemResultDto();
    }
}