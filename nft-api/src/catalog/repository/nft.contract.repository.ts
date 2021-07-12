import { NftContractEntity } from '../../entity/nft.contract.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(NftContractEntity)
export class NftContractRepository extends Repository<NftContractEntity> {
}