import { EntityRepository, Repository } from 'typeorm';
import { NftItemEntity } from '../../entity/nft.item.entity';

@EntityRepository(NftItemEntity)
export class NftItemRepository extends Repository<NftItemEntity> {
}