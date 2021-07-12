import { NftApiService } from './../../shared/services/nft/nft.api.service';
import { NftItemDto } from './../../shared/services/nft/dto/nft.item.dto';
import { BrowseCategoryCards } from './BrowseCategoryCards';
import { UserAuthService } from './../../shared/services/user/user.auth.service';
import { SignUpModalComponent } from './../../shared/modals/sign-up-modal/sign-up-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getItemPreviewUrl } from './../../shared/basic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  assetCards: any[] = [
    {
      cardImg: "assets/imgs/home/asset-card1.png",
      title: "Back",
      etherAmount: "0,0014",
      id: "#145",
      userAvatar: "assets/imgs/home/Wade Warren.png",
      userName: "Wade Warren",
      price: 550,
      last: "Last 0,0009"
    },
    {
      cardImg: "assets/imgs/home/asset-card2.png",
      title: "One",
      etherAmount: "0,0014",
      id: "#145",
      userAvatar: "assets/imgs/home/Cameron Williamson.png",
      userName: "Cameron Williamson",
      price: 550,
      last: "Last 0,0009"
    },
    {
      cardImg: "assets/imgs/home/asset-card3.png",
      title: "Trouble",
      etherAmount: "0,0014",
      id: "#145",
      userAvatar: "assets/imgs/home/Jenny Wilson.png",
      userName: "Jenny Wilson",
      price: 550,
      last: "Last 0,0009"
    },
  ];

  trendingCards: any[] = [
    {
      cardImg: "assets/imgs/home/trending-card1.png",
      userAvatar: "assets/imgs/home/Wet.png",
      userName: "Wet",
      itemCount: 421
    },
    {
      cardImg: "assets/imgs/home/trending-card2.png",
      userAvatar: "assets/imgs/home/Perfect.png",
      userName: "Perfect",
      itemCount: 111
    },
    {
      cardImg: "assets/imgs/home/trending-card3.png",
      userAvatar: "assets/imgs/home/Greasy.png",
      userName: "Greasy",
      itemCount: 1201
    },
  ];

  public browseCategoryCards = BrowseCategoryCards;
  public heroNftItem: NftItemDto;
  public chosenNftItems: NftItemDto[] = [];
  public trendingNftItems: NftItemDto[] = [];

  constructor(
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly userAuthService: UserAuthService,
    private readonly nftApiService: NftApiService
  ) { }

  async ngOnInit(): Promise<void> {
    this.getHeroNftItems();
    this.getChosenNftItems();
    this.getTrendingNftItems();
  }

  public openNFTCard(item: NftItemDto): void {
    if (!item) {
      return;
    }

    this.router.navigateByUrl(`/card/${item.identifier}`);
  }

  goCollectionVar() {
    this.router.navigateByUrl("/collection-var");
  }

  public createNft(): void {
    const isAuthorized = this.userAuthService.getAuthorizationStatus();

    if (isAuthorized) {
      this.router.navigate(['/select-create-collection']);
    } else {
      this.openLoginDialog();
    }
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

  private async getHeroNftItems(): Promise<void> {
    const heroNftItems = await this.nftApiService.getHeroNftItems();
    this.heroNftItem = heroNftItems[0];
    this.heroNftItem.previewUrl = getItemPreviewUrl(this.heroNftItem);
  }

  private async getTrendingNftItems(): Promise<void> {
    const trendingNftItems = await this.nftApiService.getTrendingNftItems();
    if (trendingNftItems.length === 0) {
      return;
    }

    const trendingNftItemCollection = trendingNftItems.slice(0, 3);
    this.trendingNftItems = trendingNftItemCollection.map(item => {
      item.previewUrl = getItemPreviewUrl(item);
      return item;
    });
  }

  private async getChosenNftItems(): Promise<void> {
    const chosenNftItems = await this.nftApiService.getChosenNftItems();
    if (chosenNftItems.length === 0) {
      return;
    }

    const chosenNftItemsCollection = chosenNftItems.slice(0, 3);
    this.chosenNftItems = chosenNftItemsCollection.map(item => {
      item.previewUrl = getItemPreviewUrl(item);
      return item;
    });
  }
}
