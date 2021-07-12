import { EntityRepository, Repository } from 'typeorm';
import { AuthInfoEntity } from '../entity/auth.info.entity';

@EntityRepository(AuthInfoEntity)
export class AuthRepository extends Repository<AuthInfoEntity> {
}