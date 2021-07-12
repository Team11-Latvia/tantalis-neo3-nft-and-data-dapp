import { UserInfoService } from './../../shared/services/user/user.info.service';
import { NftContractDto } from './../../shared/services/nft/dto/nft.contract.dto';
import { NftCategoryDto } from './../../shared/services/nft/dto/nft.category.dto';
import { NftItemDto } from './../../shared/services/nft/dto/nft.item.dto';
import { NftApiService } from './../../shared/services/nft/nft.api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getItemPreviewUrl } from '@app/shared/basic';

@Component({
  selector: 'app-collection-var',
  templateUrl: './collection-var.component.html',
  styleUrls: ['./collection-var.component.scss']
})
export class CollectionVarComponent implements OnInit {
  field: string = "All";
  fields: string[] = [
    "All", 'Art', "Music", "Games", "Movies"
  ];
  collectionCards: any[] = [
    {
      favorite: false,
      src: "assets/imgs/collectionVar/collectionVar1.png",
      title: "Name of collection",
      etherAmount: "0,0014"
    },
    {
      favorite: false,
      src: "assets/imgs/collectionVar/collectionVar2.png",
      title: "Name of collection",
      etherAmount: "0,0014"
    },
    {
      favorite: false,
      src: "assets/imgs/collectionVar/collectionVar3.png",
      title: "Name of collection",
      etherAmount: "0,0014"
    },
    {
      favorite: false,
      src: "assets/imgs/collectionVar/collectionVar4.png",
      title: "Name of collection",
      etherAmount: "0,0014"
    },
    {
      favorite: false,
      src: "assets/imgs/collectionVar/collectionVar5.png",
      title: "Name of collection",
      etherAmount: "0,0014"
    },
    {
      favorite: false,
      src: "assets/imgs/collectionVar/collectionVar6.png",
      title: "Name of collection",
      etherAmount: "0,0014"
    }
  ];
  filteredCards: any[] = [];
  size: number = 10;
  page: number = 0;

  public nftItems: NftItemDto[] = [];
  public categories: NftCategoryDto[] = [];
  public selectedCategory: NftCategoryDto;
  public collection: NftContractDto | undefined;
  public isAuthor: boolean = false;
  public totalCollectionValue = 0;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly nftApiService: NftApiService,
    private readonly userInfoService: UserInfoService
  ) { }

  async ngOnInit(): Promise<void> {
    const contractId = this.activatedRoute.snapshot.params.id;
    if (!contractId) {
      this.router.navigate(['/home']);
    }

    this.getCollection(contractId);
    this.getCategories();
  }

  public selectCategory(category: NftCategoryDto): void {
    if (!category) {
      return;
    }

    this.selectedCategory = category;
  }

  public createNft(): void {
    if (!this.collection) {
      return;
    }

    this.router.navigateByUrl(`/create/${this.collection.identifier}`);
  }

  public openNFTCard(item: NftItemDto): void {
    if (!item) {
      return;
    }

    this.router.navigateByUrl(`/card/${item.identifier}`);
  }

  setField(field: string) {
    this.field = field;
  }

  filterCards() {
    let cards: any[] = [];
    this.collectionCards.forEach((card: any) => {
      cards.push(card);
    })
    this.filteredCards = cards.splice(this.page * this.size, this.size);
  }

  getData(e: any) {
    this.page = e?.pageIndex;
    this.size = e?.pageSize;
    this.filterCards();
  }

  private async getCollection(contractId: string): Promise<void> {
    this.collection = await this.nftApiService.getNftContract(contractId);
    if (!this.collection) {
      return;
    }
    this.collection.previewUrl = getItemPreviewUrl(this.collection);

    this.nftItems = this.collection.items.map(item => {
      if (item.price && item.price.price) {
        this.totalCollectionValue += Number(item.price.price);
      }
      
      item.previewUrl = getItemPreviewUrl(item);
      return item;
    });

    this.validateAuthor(this.collection);
  }

  private async getCategories(): Promise<void> {
    const categories = await this.nftApiService.getCategories();
    this.categories = [NftCategoryDto.allCategory(true), ...categories];
    this.selectedCategory = this.categories[0];
  }

  private async validateAuthor(collection: NftContractDto): Promise<void> {
    const wallet = this.userInfoService.getUserWalletInfo();
    if (!wallet || !wallet.account) {
      return;
    }

    if (collection.publisherAddress === wallet.account.address) {
      this.isAuthor = true;
    }
  }
}
