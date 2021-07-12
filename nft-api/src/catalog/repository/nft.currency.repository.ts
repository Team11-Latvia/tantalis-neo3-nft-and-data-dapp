import { NftCurrencyEntity } from '../../entity/nft.currency.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(NftCurrencyEntity)
export class NftCurrencyRepository extends Repository<NftCurrencyEntity> {
}