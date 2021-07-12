import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { NftItemMedia, NftItemType } from "../entity/nft.item.entity";
import { NftCategoryRepository } from "../catalog/repository/nft.category.repository";
import { NftContractRepository } from "../catalog/repository/nft.contract.repository";
import { NftItemRepository } from "../catalog/repository/nft.item.repository";
import { CreateNftItemRepository } from "./create.nft.item.repository";
import { CreateNftItemDto } from "./dto/create.nft.item.dto";
import { CreateNftItemResultDto } from "./dto/create.nft.item.result.dto";
import { NftContractType } from "../entity/nft.contract.entity";
import { BlockchainService } from "../blockchain/blockchain.service";
import { BlockchainNetwork } from "../blockchain/types/blockchain.network";
import { DeploySmartContractDto } from "../blockchain/dto/deploy.smart.contract.dto";
import { DeploySmartContractItemDto } from "../blockchain/dto/deploy.smart.contract.item";
import { BlockchainTokenType } from "../blockchain/types/blockchain.token";
import { NftCurrencyRepository } from "../catalog/repository/nft.currency.repository";
import { NftPriceRepository } from "../catalog/repository/nft.price.repository";
import { NftPriceEntity } from "src/entity/nft.price.entity";

@Injectable()
export class CreateNftService {
    constructor(
        private readonly nftCurrencyRepository: NftCurrencyRepository,
        private readonly nftPriceRepository: NftPriceRepository,
        private readonly createNftItemRepository: CreateNftItemRepository,
        private readonly nftCategoryRepository: NftCategoryRepository,
        private readonly nftContractRepository: NftContractRepository,
        private readonly nftItemRepository: NftItemRepository,
        private readonly blockchainService: BlockchainService
    ) {
    }

    async getNftItemState(address: string, identifier: string): Promise<CreateNftItemResultDto> {
        const found = await this.createNftItemRepository.findOne({
            where: {
                identifier: identifier,
                publisherAddress: address
            }
        });

        if (!found) {
            throw new NotFoundException('Created NFT item not found');
        }

        return new CreateNftItemResultDto(found.identifier, found.createdTxHash, found.state);
    }

    async createNftItem(address: string, dto: CreateNftItemDto): Promise<CreateNftItemResultDto> {
        console.log(`Creating: ${JSON.stringify(dto)}`);

        const newEntity = this.createNftItemRepository.create({
            publisherAddress: address,
            authorAddress: address,
            type: NftItemType[dto.type],
            media: NftItemMedia.Raw, // TODO: resolve by MIME provided from: dto.media;
            name: dto.name,
            symbol: dto.symbol,
            description: dto.description,
            resourceUrl: dto.resourceUrl ?? dto.previewUrl,
            previewUrl: dto.previewUrl ?? dto.resourceUrl,
            createNew: dto.createNew
        });

        // New contract or new contract item
        if (newEntity.createNew) {
            // Get or create a category
            let category = await this.nftCategoryRepository.findOne({ name: newEntity.type });
            if (!category) {
                const createdCategory = this.nftCategoryRepository.create({ name: newEntity.type, description: newEntity.type });
                category = await this.nftCategoryRepository.save(createdCategory);
            }

            // New Contract
            newEntity.contract = this.nftContractRepository.create({
                publisherAddress: address,
                type: NftContractType.NEP11,
                category: category,
                name: dto.name,
                symbol: dto.symbol,
                description: dto.description,
                resourceUrl: dto.resourceUrl ?? dto.previewUrl,
                previewUrl: dto.previewUrl ?? dto.resourceUrl
            });
            
            // Save new Contract
            const savedContract = await this.nftContractRepository.save(newEntity.contract);
            console.log('Saved contract:');
            console.dir(savedContract);
        } else {
            if (!dto.contractId) {
                throw new BadRequestException('Contract is not provided to add to')
            }

            const contract = await this.nftContractRepository.findOne({ identifier: dto.contractId }, { relations: ['items'] });
            if (!contract) {
                throw new NotFoundException('Contract not found');
            }

            // TODO: Default Price
            /*let itemDefaultPrice: NftPriceEntity | undefined = undefined;
            try {
                let itemDefaultCurrency = await this.nftCurrencyRepository.findOne({ code: 'GAS' });
                if (!itemDefaultCurrency) {
                    itemDefaultCurrency = this.nftCurrencyRepository.create({ code: 'GAS', name: 'GAS' });
                    this.nftCurrencyRepository.save(itemDefaultCurrency);
                }

                itemDefaultPrice = this.nftPriceRepository.create({
                    currency: itemDefaultCurrency,
                    price: '10.00'
                });
            } catch(e) {
                console.warn(e.message);
            }*/

            // New Contract item
            newEntity.item = this.nftItemRepository.create({
                publisherAddress: address,
                ownerAddress: address,
                authorAddress: address,
                contract: contract,
                type: NftItemType[dto.type],
                media: NftItemMedia.Raw, // TODO: resolve by MIME provided from: dto.media;
                name: dto.name,
                symbol: dto.symbol,
                description: dto.description,
                resourceUrl: dto.resourceUrl ?? dto.previewUrl,
                previewUrl: dto.previewUrl ?? dto.resourceUrl,
                //price: itemDefaultPrice
            });
            
            // Update Contract
            if (contract.items) {
                contract.items.push(newEntity.item);
            } else {
                contract.items = [ newEntity.item ];
            }
            const savedContract = await this.nftContractRepository.save(contract);
            console.log('Updated contract:');
            console.dir(savedContract);

            // Save Item
            const savedItem = await this.nftItemRepository.save(newEntity.item);
            console.log('Saved item:');
            console.dir(savedItem);

            // Update Contract 2
            contract.items.push(newEntity.item);
            const savedContract2 = await this.nftContractRepository.save(contract);
            console.log('Updated again contract:');
            console.dir(savedContract2);
        }

        // Initial Create Entity save
        const saved = await this.createNftItemRepository.save(newEntity);

        // TODO: Align: Blockchain real SC/Item deployment.
        // TODO: Listen blocks for completion.
        if (newEntity.createNew) {
            const deployDto: DeploySmartContractDto = {
                contract: {
                    script: '',
                    scriptHash: '',
                    address: address,
                    ownerAddress: address
                },
                token: {
                    type: BlockchainTokenType.NEP11,
                    name: dto.name,
                    symbol: dto.symbol,
                    decimals: 0,
                    factor: 0
                }
            };
            const scDeployResult = await this.blockchainService.deploySmartContract(BlockchainNetwork.Neo, deployDto);
            console.dir(scDeployResult);
        } else {
            const deployDto: DeploySmartContractItemDto = {
                contract: {
                    script: '',
                    scriptHash: '',
                    address: address,
                    ownerAddress: address
                },
                token: {
                    type: BlockchainTokenType.NEP11,
                    name: dto.name,
                    symbol: dto.symbol,
                    decimals: 0,
                    factor: 0
                }
            };
            const scDeployResult = await this.blockchainService.deploySmartContractItem(BlockchainNetwork.Neo, deployDto);
            console.dir(scDeployResult);
        }

        return new CreateNftItemResultDto(
            // TODO: Align: Created + Contract or Entity: saved.identifier,
            newEntity.createNew ? newEntity.contract.identifier : newEntity.item.identifier,
            saved.createdTxHash,
            saved.state
        );
    }
}
