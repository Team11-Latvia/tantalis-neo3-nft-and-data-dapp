import { Logger } from './../../logger/logger';
import { WalletPluginService } from './../wallet/wallet.plugin.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Injectable, OnInit } from "@angular/core";
import { UserInfoService } from './user.info.service';

@Injectable({ providedIn: 'root' })
export class UserAuthService {

    public readonly isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private readonly logger = new Logger(UserAuthService.name);

    constructor(
        private readonly userService: UserService,
        private readonly userInfoService: UserInfoService,
        private readonly router: Router,
        private readonly walletPluginService: WalletPluginService
    ) {
        this.authenticateUser();
    }

    public getAuthorizationStatus(): boolean {
        return this.isLoggedIn.getValue();
    }

    public async authorizeUser(): Promise<void> {
        const wallet = await this.walletPluginService.connectWallet();
        const userInfo = await this.userService.loginWithWallet(wallet);

        this.userInfoService.setUserInfo(userInfo);
        this.logger.debug(`User logged-in: ${JSON.stringify(userInfo)}`);
        this.logIn();
    }

    public logIn(): void {
        this.isLoggedIn.next(true);
    }

    public logOut(): void {
        this.userService.logout();
        this.isLoggedIn.next(false);
        this.router.navigate(['/home']);
    }

    private async authenticateUser(): Promise<void> {
        try {
            this.walletPluginService.start();
            const loggedInUserInfo = await this.userService.getLoggedInUser();

            if (loggedInUserInfo) {
                this.userInfoService.setUserInfo(loggedInUserInfo);
                this.logIn();

                this.logger.debug(`User logged-in previously: ${JSON.stringify(loggedInUserInfo)}`);
            } else {
                this.logger.debug(`New user session...`);
            }
        } catch (error) {
            this.logger.error(error);
        }
    }
}