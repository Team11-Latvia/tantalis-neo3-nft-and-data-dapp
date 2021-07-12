import { WalletInfo } from './../../wallet/wallet.plugin.service';
import { ServerUserDto } from "./server.user.dto";

export class LocalUserInfo {
    user?: ServerUserDto;

    wallet: WalletInfo;

    constructor(wallet: WalletInfo, user: ServerUserDto | undefined) {
        this.user = user;
        this.wallet = wallet;
    }
}
