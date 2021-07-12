export enum CreateNftItemState {
    NEW = 'NEW',
    ANNOUNCED = 'ANNOUNCED',
    CONFIRMED = 'CONFIRMED',
    FAILED = 'FAILED',
    CANCELED = 'CANCELED'
}

export class CreateNftItemResultDto {
    identifier?: string;
    txHash?: string;
    state?: CreateNftItemState;
}