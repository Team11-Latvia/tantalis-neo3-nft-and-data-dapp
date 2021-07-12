import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AssetDto {
    // TODO: Improve currency code/hash mapper here
    private static readonly NEO_HASH = '0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5';
    private static readonly GAS_HASH = '0xd2a4cff31913016155e38e474a2c06d08be276cf';

    @ApiHideProperty()
    public static readonly NEO_ASSET = new AssetDto(
        AssetDto.NEO_HASH,
        'NEO',
        'NEO',
        0
    );

    @ApiHideProperty()
    public static readonly GAS_ASSET = new AssetDto(
        AssetDto.GAS_HASH,
        'GAS',
        'GAS',
        8
    );

    @ApiProperty()
    readonly hash: string;

    @ApiProperty()
    readonly code: string;

    @ApiPropertyOptional()
    readonly name?: string;

    @ApiPropertyOptional()
    readonly decimals?: string;

    constructor(
        hash: string,
        code: string,
        name: string,
        decimals: string  | number | undefined
    ) {
        this.hash = hash;
        this.code = code;
        this.name = name;
        this.decimals = decimals?.toString();
    }

    static fromCodeOrHash(codeOrHash: string): AssetDto {
        if (codeOrHash.toLowerCase() === AssetDto.NEO_HASH.toLowerCase()) {
            return AssetDto.NEO_ASSET;
        }

        if (codeOrHash.toLowerCase() === AssetDto.GAS_HASH.toLowerCase()) {
            return AssetDto.GAS_ASSET;
        }

        if (codeOrHash.toUpperCase() === 'NEO') {
            return AssetDto.NEO_ASSET;
        }

        if (codeOrHash.toUpperCase() === 'GAS') {
            return AssetDto.GAS_ASSET;
        }

        // Other by code or hash
        if (codeOrHash.toLowerCase().startsWith('0x')) {
            // By hash
            return new AssetDto(codeOrHash, '', '', undefined);
        } else {
            // By code
            return new AssetDto(undefined, codeOrHash, '', undefined);
        }
    }
}
