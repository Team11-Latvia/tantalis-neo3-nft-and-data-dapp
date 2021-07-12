import { WalletInfo } from './../wallet/wallet.plugin.service';
import { LocalUserInfo } from './dto/local.user.info';

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserInfoService {

    private userInfo?: LocalUserInfo;

    constructor(
    ) {}

    public getUserInfo(): LocalUserInfo | undefined {
        if (!this.userInfo) {
            return undefined;
        }

        return this.userInfo;
    }

    public getUserWalletInfo(): WalletInfo | undefined {
        if (!this.userInfo) {
            return undefined;
        }

        return this.userInfo.wallet;
    }

    public setUserInfo(user: LocalUserInfo): void {
        if (!user) {
            return;
        }

        this.userInfo = user;
    }

    public clearUserInfo(): void {
        this.userInfo = undefined;
    }
}