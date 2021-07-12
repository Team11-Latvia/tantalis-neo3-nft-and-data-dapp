import { NftBidItemResultDto } from "./dto/nft.bid.item.result.dto";
import { NftBuyItemResultDto } from "./dto/nft.buy.item.result.dto";
import { NftCategoryDto } from "./dto/nft.category.dto";
import { NftContractDto } from "./dto/nft.contract.dto";
import { CreateNftItemDto } from "./dto/create.nft.item.dto";
import { CreateNftItemResultDto } from "./dto/create.nft.item.result.dto";
import { NftItemDto } from "./dto/nft.item.dto";

export interface NftApiServiceInterface {
    getCategories(): Promise<NftCategoryDto[]>;

    getNftContracts(): Promise<NftContractDto[]>;
    getNftContract(identifier: string): Promise<NftContractDto | undefined>;
    
    getNftItem(identifier: string): Promise<NftItemDto | undefined>;

    buyNftItem(address: string, identifier: string): Promise<NftBuyItemResultDto>;
    bidNftItem(address: string, identifier: string): Promise<NftBidItemResultDto>;

    createNftItem(address: string, item: CreateNftItemDto): Promise<CreateNftItemResultDto>;
}