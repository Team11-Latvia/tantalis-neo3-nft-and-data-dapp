import { Logger } from './../../logger/logger';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BrowserStorageService } from '../storage/browser.storage.service';
import { WalletInfo, WalletPluginService } from '../wallet/wallet.plugin.service';
import { LocalUserInfo } from './dto/local.user.info';
import { ServerUserDto } from './dto/server.user.dto';

@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly logger = new Logger(UserService.name);

    onUserInfoChanged = new EventEmitter<LocalUserInfo>();

    constructor(
        private readonly httpClient: HttpClient,
        private readonly browserStorageService: BrowserStorageService,
        private readonly walletPluginService: WalletPluginService
    ) {
    }

    async loginWithWallet(wallet: WalletInfo): Promise<LocalUserInfo> {
        const walletSaved = this.browserStorageService.storeValueByKey<WalletInfo>('user_wallet', wallet);
        const serverUserCached = this.browserStorageService.getValueByKey<ServerUserDto>('server_user');
        const serverUserSync = await this.syncServerUser(walletSaved, serverUserCached, false);
        const userInfo = new LocalUserInfo(walletSaved, serverUserSync);
        this.onUserInfoChanged.emit(userInfo);
        return userInfo;
    }

    async getLoggedInUser(): Promise<LocalUserInfo | undefined> {
        const walletFound = this.browserStorageService.getValueByKey<WalletInfo>('user_wallet');
        if (walletFound) {
            const serverUserCached = this.browserStorageService.getValueByKey<ServerUserDto>('server_user');
            const serverUserSync = await this.syncServerUser(walletFound, serverUserCached, false);
            const userInfo = new LocalUserInfo(walletFound, serverUserSync);
            this.onUserInfoChanged.emit(userInfo);
            return userInfo;
        }
        return undefined;
    }

    logout(): void {
        this.browserStorageService.removeValueByKey('user_wallet');
        this.browserStorageService.removeValueByKey('server_user');
        this.browserStorageService.clear();
        this.onUserInfoChanged.emit(undefined);
    }

    async syncServerUser(wallet: WalletInfo, userToSync: ServerUserDto | undefined, forceUpdate: boolean): Promise<ServerUserDto | undefined> {
        // TODO: Force priv/pub key auth here to protect POST data and get rid of address
        try {
            // Case 1: explicit sync from local to server (like update user info)
            if (forceUpdate) {
                const updatedUser = await this.httpClient.post<ServerUserDto>(`/user/${wallet.account.address}`, userToSync).toPromise();
                const savedUser = this.browserStorageService.storeValueByKey<ServerUserDto>('server_user', updatedUser);
                return savedUser;
            }

            // Case 2: implicit sync to server, e.g update if no server one
            const serverUser = await this.httpClient.get<ServerUserDto>(`/user/${wallet.account.address}`).toPromise();
            if (!serverUser) {
                const updatedUser = await this.httpClient.post<ServerUserDto>(`/user/${wallet.account.address}`, userToSync).toPromise();
                const savedUser = this.browserStorageService.storeValueByKey<ServerUserDto>('server_user', updatedUser);
                return savedUser;
            }

            // Case 3: implicit sync from server, e.g update if no local one
            if (serverUser && !userToSync) {
                const savedUser = this.browserStorageService.storeValueByKey<ServerUserDto>('server_user', serverUser);
                return savedUser;
            }
            
            // Case 4: implicit sync two-way based on modification date
            // TBD, see 'ServerUserDto.modifiedDate'
        } catch(e) {
            this.logger.error(e);
        }

        // Fallback to given user info in case of errors above
        return userToSync;
    }
}