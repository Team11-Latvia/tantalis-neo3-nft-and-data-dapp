import { TextModalComponent } from './../../shared/modals/text-modal/text-modal.component';
import { SignUpModalComponent } from './../../shared/modals/sign-up-modal/sign-up-modal.component';
import { NftApiService } from './../../shared/services/nft/nft.api.service';
import { NftItemDto } from './../../shared/services/nft/dto/nft.item.dto';
import { LocalUserInfo } from './../../shared/services/user/dto/local.user.info';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutModalComponent } from './../../shared/modals/checkout-modal/checkout-modal.component';
import { UserAuthService } from './../../shared/services/user/user.auth.service';
import { getItemPreviewUrl } from '@app/shared/basic';

@Component({
  selector: 'app-nftcard',
  templateUrl: './nftcard.component.html',
  styleUrls: ['./nftcard.component.scss']
})
export class NFTCardComponent implements OnInit {
  public panelOpenState = true;
  public favorite = false;

  public userInfo?: LocalUserInfo;
  public item: NftItemDto | undefined;
  public isAuthorized = false;
  
  constructor(
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userAuthService: UserAuthService,
    private readonly nftApiService: NftApiService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getNFTItem();
  }

  public openCheckout(): void {
    if (this.userAuthService.getAuthorizationStatus()) {
      this.openCheckoutDialog();
    } else {
      this.openLoginDialog();
    }
  }

  public openCollection(): void {
    if (!this.item || !this.item.contract) {
      return;
    }

    this.router.navigate([`/collection-var/${this.item.contract.identifier}`]);
  }

  public openPhisicalDeliveryCommingSoon() {
    this.matDialog.open(TextModalComponent, {
      data: {
        title: 'Physical Delivery',
        content: [
          { type: 'TEXT', data: 'Coming very soon!' }
        ]
      },
      width: "500px",
      maxWidth: "90vw"
    });
  }

  private async getNFTItem(): Promise<void> {
    const identifier = this.activatedRoute.snapshot.params.id;
    this.item = await this.nftApiService.getNftItem(identifier);

    if (this.item) {
      this.item.previewUrl = getItemPreviewUrl(this.item);
    } else {
      this.router.navigate(['/home']);
    }
  }

  private openCheckoutDialog(): void {
    this.matDialog.open(CheckoutModalComponent, {
      data: this.item,
      width: "700px",
      maxWidth: "90vw"
    });
  }

  private openLoginDialog(): void {
    this.matDialog.open(SignUpModalComponent, {
      data: {
        animal: 'panda'
      },
      width: "500px",
      maxWidth: "90vw"
    });
  }
}
