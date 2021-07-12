//
// BlockchainNetwork
//
export enum BlockchainNetworkType {
    NEO = 'NEO',
    NXA = 'NXA'
}

//
// BlockchainNetwork
//
export class BlockchainNetwork {
    public static readonly Neo = new BlockchainNetwork(
        BlockchainNetworkType.NEO,
        '844378958',
        'NEO3RC3-TESTNET',
        'http://neonode.nft.teamxi.cloud:20332'
    );

    public static readonly Nxa = new BlockchainNetwork(
        BlockchainNetworkType.NXA,
        '199',
        'NXA-TESTNET',
        'http://nxa-testnet-node-public:20332'
    );

    public static readonly Default = BlockchainNetwork.Neo;

    type: BlockchainNetworkType;
    networkId: string;
    version: string;
    rpcEndpoint: string;

    constructor(
        type: BlockchainNetworkType,
        networkId: string,
        version: string,
        rpcEndpoint: string
    ) {
        this.type = type;
        this.networkId = networkId;
        this.version = version;
        this.rpcEndpoint = rpcEndpoint;
    }
}