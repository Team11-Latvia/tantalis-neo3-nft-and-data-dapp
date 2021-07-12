import { EntityRepository, Repository } from 'typeorm';
import { NftPriceEntity } from '../../entity/nft.price.entity';

@EntityRepository(NftPriceEntity)
export class NftPriceRepository extends Repository<NftPriceEntity> {
}