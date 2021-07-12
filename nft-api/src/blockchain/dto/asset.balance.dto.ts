import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AssetDto } from './asset.dto';
import { Decimal } from 'decimal.js';

export class AssetBalanceDto {
    @ApiProperty()
    readonly asset: AssetDto;

    @ApiPropertyOptional()
    readonly lastUpdatedBlockIndex?: string;

    @ApiProperty()
    readonly address: string;

    @ApiProperty()
    readonly amount: string;

    @ApiProperty()
    readonly formatted: string;

    constructor(
        asset: AssetDto,
        lastUpdatedBlockIndex: string | number | undefined,
        address: string,
        amount: string
    ) {
        this.asset = asset;
        this.lastUpdatedBlockIndex = lastUpdatedBlockIndex?.toString();
        this.address = address;
        this.amount = amount;
        this.formatted = amount && asset.decimals ?
            new Decimal(amount)
                .div(new Decimal(10).pow(asset.decimals))
                .toFixed(new Decimal(asset.decimals).toNumber())
                .toString() :
            amount;
    }

    // {
    //     balance: [
    //       {
    //         assethash: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
    //         amount: '350000000000',
    //         lastupdatedblock: 270618
    //       }
    //     ],
    //     address: 'NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP'
    // }
    static fromRpcBalances(response: any): AssetBalanceDto[] {
        if (!response) {
            throw new Error('Invalid Balance response provided');
        }
        const address = response.address;
        const balances: Array<{assethash: string, amount: string, lastupdatedblock: number}> = response.balance ?? [];
        if (!address || !balances) {
            throw new Error('Invalid Balance response provided');
        }
        const dtos = balances.map(
            b => new AssetBalanceDto(AssetDto.fromCodeOrHash(b.assethash), b.lastupdatedblock, address, b.amount)
        );
        return dtos;
    }
}