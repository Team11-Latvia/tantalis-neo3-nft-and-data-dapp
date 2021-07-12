import { Injectable, NotImplementedException } from "@nestjs/common";
import { AssetBalanceDto } from "../../../blockchain/dto/asset.balance.dto";
import { BlockchainNetwork } from "../../../blockchain/types/blockchain.network";
import { DeploySmartContractDto } from "../../../blockchain/dto/deploy.smart.contract.dto";
import { DeploySmartContractItemDto } from "../../../blockchain/dto/deploy.smart.contract.item";
import { DeploySmartContractResultDto } from "../../../blockchain/dto/deploy.smart.contract.result.dto";
import { BlockchainProviderInterface } from "../../../blockchain/types/blockchain.provider.interface";

//
// NxaBlockchainProvider
//
@Injectable()
export class NxaBlockchainProvider implements BlockchainProviderInterface {
    connect(network: BlockchainNetwork): void {
        throw new NotImplementedException();
    }

    disconnect(): void {
        throw new NotImplementedException();
    }

    testConnection(): Promise<void> {
        throw new NotImplementedException();
    }

    async balanceOf(address: string): Promise<AssetBalanceDto[]> {
        throw new NotImplementedException();
    }

    balanceByAssetOf(asset: string, address: string): Promise<AssetBalanceDto> {
        throw new NotImplementedException();
    }

    deploySmartContract(network: BlockchainNetwork, dto: DeploySmartContractDto): Promise<DeploySmartContractResultDto> {
        throw new NotImplementedException();
    }

    deploySmartContractItem(network: BlockchainNetwork, dto: DeploySmartContractItemDto): Promise<DeploySmartContractResultDto> {
        throw new NotImplementedException();
    }
}
