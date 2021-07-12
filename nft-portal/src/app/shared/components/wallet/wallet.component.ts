import { WalletInfo, BalanceInfo } from './../../services/wallet/wallet.plugin.service';
import { UserInfoService } from './../../services/user/user.info.service';
import { UserAuthService } from './../../services/user/user.auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  public wallet: WalletInfo | undefined;
  public account: BalanceInfo | undefined;

  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly userInfoService: UserInfoService
  ) {
  }

  ngOnInit(): void {
    this.wallet = this.userInfoService.getUserWalletInfo();

    if (this.wallet && this.wallet.balance) {
      this.account = this.wallet.balance[this.wallet.account.address].find(acc => acc.symbol === 'GAS');
    }
  }

  public disconectWallet(): void {
    this.userAuthService.logOut();
  }
}
