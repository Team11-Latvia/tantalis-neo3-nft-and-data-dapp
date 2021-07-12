import { EntityRepository, Repository } from 'typeorm';
import { NftTransactionEntity } from '../../entity/nft.transaction.entity';

@EntityRepository(NftTransactionEntity)
export class NftTransactionRepository extends Repository<NftTransactionEntity> {
}