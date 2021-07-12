import { environment } from './../../../environments/environment';
import { UserAuthService } from './../../shared/services/user/user.auth.service';
import { NftApiService } from './../../shared/services/nft/nft.api.service';
import { MatTableDataSource } from '@angular/material/table';
import { NftItemDto } from './../../shared/services/nft/dto/nft.item.dto';
import { NftCategoryDto } from './../../shared/services/nft/dto/nft.category.dto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getItemPreviewUrl } from './../../shared/basic';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  public chainOptions: string[] = [];
  public selectedChainOption = '';
  public size: number = 10;
  public page: number = 0;
  public dataSource: MatTableDataSource<NftItemDto> = new MatTableDataSource<NftItemDto>();
  public categories: NftCategoryDto[] = [];
  public selectedCategory: NftCategoryDto;
  public isAuthorized: boolean = false;

  constructor(
    private readonly nftApiService: NftApiService,
    private readonly router: Router,
    private readonly userAuthService: UserAuthService
  ) { }

  async ngOnInit(): Promise<void> {
    // Get and flatten all NFT items
    const contracts = await this.nftApiService.getNftContracts();
    const allItems = contracts.flatMap(c => c.items);

    const mappedItems = allItems.map(item => {
      item.previewUrl = getItemPreviewUrl(item);
      return item;
    });

    this.dataSource = new MatTableDataSource<NftItemDto>(mappedItems);
    this.dataSource.filterPredicate = this.filterPredicate;

    // Get chain options aka super-categories
    const superCategories = await this.nftApiService.getSuperCategories();
    this.chainOptions = superCategories.map(s => s.name.toUpperCase());
    this.selectedChainOption = this.chainOptions[0];

    // Get server-side defined categories
    const categories = await this.nftApiService.getCategories();

    // And inject default one with name 'All'
    this.categories = [NftCategoryDto.allCategory(true), ...categories];
    this.selectedCategory = this.categories[0];

    this.isAuthorized = this.userAuthService.getAuthorizationStatus();
  }


  public selectCategory(category: NftCategoryDto): void {
    if (!category) {
      return;
    }

    this.selectedCategory = category;
  }

  getData(e: any) {
    this.page = e?.pageIndex;
    this.size = e?.pageSize;
  }

  public openNFTCard(item: NftItemDto): void {
    if (!item) {
      return;
    }

    this.router.navigateByUrl(`/card/${item.identifier}`);
  }

  private filterPredicate(item: NftItemDto, filter: string): boolean {
    if (!filter || filter.length <= 0) {
      return true;
    }

    return item.contract.category.name === filter;
  }
}
