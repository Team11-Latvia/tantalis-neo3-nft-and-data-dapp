import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Decimal as DecimalJS } from 'decimal.js';
import { NftItemDto } from './../../services/nft/dto/nft.item.dto';
import { NftApiService } from './../../services/nft/nft.api.service';
import { UserInfoService } from './../../services/user/user.info.service';
import { BalanceInfo, WalletInfo } from './../../services/wallet/wallet.plugin.service';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.scss']
})
export class CheckoutModalComponent implements OnInit {

  public account: BalanceInfo | undefined;
  public readonly nfItemAmounts = { providerFee: 0, authorFee: 0, total: 0 };

  private wallet: WalletInfo | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly nftItem: NftItemDto,
    public readonly dialogRef: MatDialogRef<CheckoutModalComponent>,
    public readonly matDialog: MatDialog,
    private readonly userInfoService: UserInfoService,
    private readonly nftApiService: NftApiService
  ) { }

  ngOnInit(): void {
    this.wallet = this.userInfoService.getUserWalletInfo();

    if (this.wallet && this.wallet.balance) {
      this.account = this.wallet.balance[this.wallet.account.address].find(acc => acc.symbol === 'GAS');
    }

    this.calculateFees();
  }

  public close(): void {
    this.dialogRef.close();
  }

  public async checkOut(): Promise<void> {
    if (!this.wallet || !this.wallet.account) {
      return;
    }

    await this.nftApiService.buyNftItem(this.wallet.account.address, this.nftItem.identifier);
    this.close();
  }

  private calculateFees(): void {
    if (!this.nftItem || !this.nftItem?.price) {
      return;
    }

    const providerFee = new DecimalJS(2.5).div(100);
    const authorFee = new DecimalJS(5).div(100);

    this.nfItemAmounts.providerFee = new DecimalJS(this.nftItem.price.price).mul(providerFee).toNumber();
    this.nfItemAmounts.authorFee = new DecimalJS(this.nftItem.price.price).mul(authorFee).toNumber();
    this.nfItemAmounts.total = new DecimalJS(this.nftItem.price.price).plus(this.nfItemAmounts.providerFee).plus(this.nfItemAmounts.authorFee).toNumber();
  }
}
