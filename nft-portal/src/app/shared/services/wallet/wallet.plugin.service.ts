import { Injectable } from '@angular/core';
import { Logger } from '@app/shared/logger/logger';

declare const NEOLineN3: any;

//
// ProviderInfo
//  See https://neoline.io/dapi/N3.html#getProvider
//
export class ProviderInfo {
    // The name of the wallet provider
    name: string;

    // The website of the wallet provider
    website: string;

    // The version of the dAPI that the the wallet supports
    version: string;

    // A list of all applicable NEPs which the wallet provider supports
    compatibility: string[];

    // This object can contain any attributes specific to the dapi provider, such as an app theme
    extra?: object;

    constructor() {
        this.name = '';
        this.website = '';
        this.version = '';
        this.compatibility = [];
        this.extra = undefined;
    }
}

//
// NetworkInfo
//  See https://neoline.io/dapi/N3.html#getNetworks
//
export class NetworkInfo {
    // Array of network names the wallet provider has available for the dapp developer to connect to
    networks: string[];

    // 	ChainId the wallet is currently set to
    chainId: number;

    // Network the wallet is currently set to
    defaultNetwork: string;

    constructor() {
        this.networks = [];
        this.chainId = -1;
        this.defaultNetwork = '';
    }
}

//
// AccountInfo
//  See https://neoline.io/dapi/N3.html#getAccount
//
export class AccountInfo {
    // 	Address of the connected account
    address: string

    // 	A label the users has set to identify their wallet
    label?: string;

    constructor() {
        this.address = '';
        this.label = undefined;
    }
}

//
// PublicKeyInfo
//  See https://neoline.io/dapi/N3.html#getPublicKey
//
export class PublicKeyInfo {
    // Address of the connected account
    address: string;

    // Public key of the connected account
    publicKey: string;

    constructor() {
        this.address = '';
        this.publicKey = '';
    }
}

//
// BalanceInfo
//  See https://neoline.io/dapi/N3.html#getBalance-BalanceResponse
//
export class BalanceInfo {
    // 	Contract of the given hash
    contract: string;

    // Symbol of the given contract
    symbol: string;

    // Double Value of the balance represented as a String
    amount: string;

    constructor() {
        this.contract = '';
        this.symbol = '';
        this.amount = '';
    }
}

//
// WalletBalance
//
export class WalletBalance {
    [address: string]: BalanceInfo[];
}

//
// WalletInfo
//
export class WalletInfo {
    public readonly provider: ProviderInfo;
    public readonly network: NetworkInfo;
    public readonly account: AccountInfo;
    public readonly publicKey: PublicKeyInfo;
    public readonly balance: WalletBalance;

    constructor(
        provider: ProviderInfo,
        network: NetworkInfo,
        account: AccountInfo,
        publicKey: PublicKeyInfo,
        balance: WalletBalance
    ) {
        this.provider = provider;
        this.network = network;
        this.account = account;
        this.publicKey = publicKey;
        this.balance = balance;
    }
}

//
// SignedMessageInfo
//  See https://neoline.io/dapi/#signMessage
//
export class SignedMessageInfo {
    // Public key of account that signed message
    publicKey: string;

    // 	Original message signed
    data: string;

    // Salt added to original message as prefix, before signing
    salt: string;

    // 	Signed message
    message: string;

    constructor(
        publicKey: string,
        data: string,
        salt: string,
        message: string
    ) {
        this.publicKey = publicKey;
        this.data = data;
        this.salt = salt;
        this.message = message;
    }
}

export class VerifiedMessageInfo {
    result: boolean;

    constructor(
        result: boolean
    ) {
        this.result = result;
    }
}

export enum NEOLineEvents {
    READY = 'NEOLine.NEO.EVENT.READY',
    ACCOUNT_CHANGED = 'NEOLine.NEO.EVENT.ACCOUNT_CHANGED',
    CONNECTED = 'NEOLine.NEO.EVENT.CONNECTED',
    DISCONNECTED = 'NEOLine.NEO.EVENT.DISCONNECTED',
    NETWORK_CHANGED = 'NEOLine.NEO.EVENT.NETWORK_CHANGED',
    BLOCK_HEIGHT_CHANGED = 'NEOLine.NEO.EVENT.BLOCK_HEIGHT_CHANGED',
    TRANSACTION_CONFIRMED = 'NEOLine.NEO.EVENT.TRANSACTION_CONFIRMED'
}

@Injectable({ providedIn: 'root' })
export class WalletPluginService {
    private readonly logger = new Logger(WalletPluginService.name);

    private started = false;
    private neolineInstance: any;
    
    start(): void {
        if (this.started) {
            this.logger.debug(`Already started.`);
            return;
        }

        this.logger.debug(`Starting...`);
        this.subscribe();
        this.started = true;
    }

    stop(): void {
        if (!this.started) {
            this.logger.debug(`Not started yet.`);
            return;
        }

        this.logger.debug(`Stopping...`);
        this.unsubscribe();
        this.started = false;
    }

    async connectWallet(): Promise<WalletInfo> {
        this.logger.debug(`Connecting wallet...`);
        try {
            if (!this.neolineInstance) {
                throw new Error('NeoLine Wallet browser plugin not found!');
            }

            const provider = await this.neolineInstance.getProvider() as ProviderInfo;
            const network = new NetworkInfo(); // await this.neolineInstance.getNetworks() as NetworkInfo;
            const account = await this.neolineInstance.getAccount() as AccountInfo;
            const publicKey = await this.neolineInstance.getPublicKey() as PublicKeyInfo;
            const balance = await this.neolineInstance.getBalance() as WalletBalance;
            const wallet = new WalletInfo(provider, network, account, publicKey, balance);
            console.dir(wallet);

            return  wallet;
        }
        catch(e) {
            this.logger.error(e);
            throw e;
        }
    }

    async announceTx<T>(payload: T): Promise<any> {
        if (!this.neolineInstance) {
            throw new Error('NeoLine Wallet browser plugin not found!');
        }
        const invokeResult = await this.neolineInstance.send(payload);
        return invokeResult;
    }

    async signPayload<T>(payload: T): Promise<SignedMessageInfo> {
        if (!this.neolineInstance) {
            throw new Error('NeoLine Wallet browser plugin not found!');
        }
        const strRepr = JSON.stringify(payload);
        const signedInfo = await this.neolineInstance.signMessage({ message: strRepr }) as SignedMessageInfo;
        return signedInfo;
    }

    async verifyPayload<T>(payload: T, signed: SignedMessageInfo): Promise<boolean> {
        if (!this.neolineInstance) {
            throw new Error('NeoLine Wallet browser plugin not found!');
        }

        const strRepr = JSON.stringify(payload);
        if (strRepr !== signed.message) {
            throw new Error(`Data integrity check failed: ${strRepr} !== ${signed.data}`);
        }

        const verifyInfo = await this.neolineInstance.verifyMessage({
            message: signed.salt + signed.message,
            data: signed.data,
            publicKey: signed.publicKey
        }) as VerifiedMessageInfo;

        return verifyInfo.result;
    }

    private subscribe(target: any = window): void {
        // NEOLineEvents.READY
        target.addEventListener(NEOLineEvents.READY, async (evt: any) => {
            this.logger.debug(NEOLineEvents.READY, JSON.stringify(evt));
            this.neolineInstance = new NEOLineN3.Init();
            console.dir(this.neolineInstance);
        });

        // NEOLineEvents.ACCOUNT_CHANGED
        target.addEventListener(NEOLineEvents.ACCOUNT_CHANGED, async (evt: any) => {
            this.logger.debug(NEOLineEvents.ACCOUNT_CHANGED, JSON.stringify(evt));
        });

        // NEOLineEvents.CONNECTED
        target.addEventListener(NEOLineEvents.CONNECTED, async (evt: any) => {
            this.logger.debug(NEOLineEvents.CONNECTED, JSON.stringify(evt));
        });

        // NEOLineEvents.DISCONNECTED
        target.addEventListener(NEOLineEvents.DISCONNECTED, async (evt: any) => {
            this.logger.debug(NEOLineEvents.DISCONNECTED, JSON.stringify(evt));
        });

        // NEOLineEvents.NETWORK_CHANGED
        target.addEventListener(NEOLineEvents.NETWORK_CHANGED, async (evt: any) => {
            this.logger.debug(NEOLineEvents.NETWORK_CHANGED, JSON.stringify(evt));
        });

        // NEOLineEvents.BLOCK_HEIGHT_CHANGED
        target.addEventListener(NEOLineEvents.BLOCK_HEIGHT_CHANGED, async (evt: any) => {
            this.logger.debug(NEOLineEvents.BLOCK_HEIGHT_CHANGED, JSON.stringify(evt));
        });

        // NEOLineEvents.TRANSACTION_CONFIRMED
        target.addEventListener(NEOLineEvents.TRANSACTION_CONFIRMED, async (evt: any) => {
            this.logger.debug(NEOLineEvents.TRANSACTION_CONFIRMED, JSON.stringify(evt));
        });
    }

    private unsubscribe(target: any = window): void {
        target.removeAllListeners!(NEOLineEvents.READY);
        target.removeAllListeners!(NEOLineEvents.ACCOUNT_CHANGED);
        target.removeAllListeners!(NEOLineEvents.CONNECTED);
        target.removeAllListeners!(NEOLineEvents.DISCONNECTED);
        target.removeAllListeners!(NEOLineEvents.NETWORK_CHANGED);
        target.removeAllListeners!(NEOLineEvents.BLOCK_HEIGHT_CHANGED);
        target.removeAllListeners!(NEOLineEvents.TRANSACTION_CONFIRMED);
    }
}
