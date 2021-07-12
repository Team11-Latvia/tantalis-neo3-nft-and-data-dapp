import { NftContractDto } from './../../shared/services/nft/dto/nft.contract.dto';
import { NftApiService } from './../../shared/services/nft/nft.api.service';
import { UserInfoService } from './../../shared/services/user/user.info.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getItemPreviewUrl } from '@app/shared/basic';

@Component({
  selector: 'app-select-create-collection',
  templateUrl: './select-create-collection.component.html',
  styleUrls: ['./select-create-collection.component.scss']
})
export class SelectCreateCollectionComponent implements OnInit {
  collectionCards: any[] = [
    {
      src: "assets/imgs/createCollection/collection1.png",
      title: "Injure",
      price: "0,0014",
      itemCount: 421
    },
    {
      src: "assets/imgs/createCollection/collection2.png",
      title: "Faulty",
      price: "0,0014",
      itemCount: 421
    },
    {
      src: "assets/imgs/createCollection/collection3.png",
      title: "Jealous",
      price: "0,0014",
      itemCount: 421
    }
  ];

  public collections: NftContractDto[] = [];

  constructor(
    private readonly router: Router,
    private readonly userInfoService: UserInfoService,
    private readonly nftApiService: NftApiService
  ) { }

  async ngOnInit(): Promise<void> {
    let walletAddres = '';

    const wallet = this.userInfoService.getUserWalletInfo();
    if (wallet && wallet.account) {
      walletAddres = wallet.account.address;
    }

    const collections = await this.nftApiService.getNftContracts();
    const filteredCollections = collections.filter(collection => collection.publisherAddress === walletAddres);

    this.collections = filteredCollections.map(collection => {
      collection.previewUrl = getItemPreviewUrl(collection);
      return collection;
    });
  }

  public createNftItem(collection: NftContractDto): void {
    if (!collection) {
      return;
    }

    this.router.navigateByUrl(`/create/${collection.identifier}`);
  }
}
