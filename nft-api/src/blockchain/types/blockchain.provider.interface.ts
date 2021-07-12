import { AssetBalanceDto } from "../dto/asset.balance.dto";
import { DeploySmartContractDto } from "../dto/deploy.smart.contract.dto";
import { DeploySmartContractItemDto } from "../dto/deploy.smart.contract.item";
import { DeploySmartContractResultDto } from "../dto/deploy.smart.contract.result.dto";
import { BlockchainNetwork } from "./blockchain.network";

//
// BlockchainProviderInterface
//
export interface BlockchainProviderInterface {
    connect(network: BlockchainNetwork): void;
    disconnect(): void;
    testConnection(): Promise<void>;
    balanceOf(address: string): Promise<AssetBalanceDto[]>;
    balanceByAssetOf(asset: string, address: string): Promise<AssetBalanceDto>;
    deploySmartContract(network: BlockchainNetwork, dto: DeploySmartContractDto): Promise<DeploySmartContractResultDto>;
    deploySmartContractItem(network: BlockchainNetwork, dto: DeploySmartContractItemDto): Promise<DeploySmartContractResultDto>;
}
