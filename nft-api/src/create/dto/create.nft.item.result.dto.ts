import { CreateNftItemState } from "../../entity/create.nft.item.entity";

export class CreateNftItemResultDto {
    identifier: string;
    txHash?: string;
    state: CreateNftItemState;

    constructor(identifier: string, txHash: string | undefined, state: CreateNftItemState) {
        this.identifier = identifier;
        this.txHash = txHash;
        this.state = state;
    }
}
