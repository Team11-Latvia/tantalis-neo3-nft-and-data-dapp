import { EntityRepository, Repository } from 'typeorm';
import { NftCategoryEntity } from '../../entity/nft.category.entity';

@EntityRepository(NftCategoryEntity)
export class NftCategoryRepository extends Repository<NftCategoryEntity> {
}