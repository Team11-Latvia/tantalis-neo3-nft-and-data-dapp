import { NftItemDto } from './../../shared/services/nft/dto/nft.item.dto';
import { NftApiService } from './../../shared/services/nft/nft.api.service';
import { NftContractDto } from './../../shared/services/nft/dto/nft.contract.dto';
import { BalanceInfo } from './../../shared/services/wallet/wallet.plugin.service';
import { UserInfoService } from './../../shared/services/user/user.info.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getItemPreviewUrl } from '@app/shared/basic';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  type: string = "myCollection";
  collectionCards: any[] = [
    {
      src: "assets/imgs/profile/collection1.png",
      title: "Motion",
      price: "0,0014",
      itemCount: 421
    },
    {
      src: "assets/imgs/profile/collection2.png",
      title: "Thougtful",
      price: "0,0014",
      itemCount: 421
    },
  ];
  myNftCards: any[] = [
    {
      favorite: false,
      src: "assets/imgs/profile/myNft1.png",
      title: "Strange",
      etherAmount: "0,0014",
      id: "#145",
      userAvatar: "assets/imgs/profile/user.png"
    },
    {
      favorite: false,
      src: "assets/imgs/profile/myNft2.png",
      title: "Foamy",
      etherAmount: "0,0014",
      id: "#145",
      userAvatar: "assets/imgs/profile/user.png"
    },
    {
      favorite: false,
      src: "assets/imgs/profile/myNft3.png",
      title: "Form",
      etherAmount: "0,0014",
      id: "#145",
      userAvatar: "assets/imgs/profile/user.png"
    },
    {
      favorite: false,
      src: "assets/imgs/profile/myNft4.png",
      title: "Uneven",
      etherAmount: "0,0014",
      id: "#145",
      userAvatar: "assets/imgs/profile/user.png"
    },
    {
      favorite: false,
      src: "assets/imgs/profile/myNft5.png",
      title: "Popcorn",
      etherAmount: "0,0014",
      id: "#145",
      userAvatar: "assets/imgs/profile/user.png"
    },
    {
      favorite: false,
      src: "assets/imgs/profile/myNft6.png",
      title: "Bird",
      etherAmount: "0,0014",
      id: "#145",
      userAvatar: "assets/imgs/profile/user.png"
    },
  ];

  public walletAddress = '';
  public account: BalanceInfo | undefined;
  public collections: NftContractDto[] = [];
  public nftItems: NftItemDto[] = [];

  constructor(
    private readonly router: Router,
    private readonly userInfoService: UserInfoService,
    private readonly nftApiService: NftApiService
  ) { }

  ngOnInit(): void {
    const wallet = this.userInfoService.getUserWalletInfo();
    if (wallet && wallet.account) {
      this.walletAddress = wallet.account.address;
    }

    if (wallet && wallet.balance) {
      this.account = wallet.balance[wallet.account.address].find(acc => acc.symbol === 'GAS');
    }

    this.getCollections();
  }

  public goCollectionVar(collection: NftContractDto) : void {
    if (!collection) {
      return;
    }

    this.router.navigate([`/collection-var/${collection.identifier}`]);
  }

  public createNew(): void {
    if (this.type === 'myCollection') {
      this.router.navigateByUrl("/create-collection");
    } else {
      this.router.navigateByUrl("/select-create-collection");
    }
  }

  public openNFTCard(item: NftItemDto): void {
    if (!item) {
      return;
    }

    this.router.navigateByUrl(`/card/${item.identifier}`);
  }

  private async getCollections(): Promise<void> {
    const collections = await this.nftApiService.getNftContracts();
    const filteredCollections = collections.filter(collection => collection.publisherAddress === this.walletAddress);
    this.collections = filteredCollections.map(collection => {
      collection.previewUrl = getItemPreviewUrl(collection);
      return collection;
    });

    this.getUserNftItemList(this.collections);
  }

  private getUserNftItemList(collections: NftContractDto[]): void {
    if (this.collections.length === 0) {
      return;
    }

    const collectionItems = collections.flatMap(c => c.items);
    this.nftItems = collectionItems.map(item => {
      item.previewUrl = getItemPreviewUrl(item);
      return item;
    });
  }
}
