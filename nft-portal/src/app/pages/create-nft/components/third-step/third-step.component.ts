import { CreateNftItemDto } from './../../../../shared/services/nft/dto/create.nft.item.dto';
import { CreateNftItemResultDto } from './../../../../shared/services/nft/dto/create.nft.item.result.dto';
import { FileUploadService } from './../../../../shared/services/file-upload/services/file.upload.service';
import { UserInfoService } from './../../../../shared/services/user/user.info.service';
import { NftApiService } from './../../../../shared/services/nft/nft.api.service';
import { Router } from '@angular/router';
import { NftCategoryDto } from './../../../../shared/services/nft/dto/nft.category.dto';
import { Logger } from './../../../../shared/logger/logger';
import { CreateCollectionComponent } from './../../../create-collection/create-collection.component';
import { NFTItemData } from './../../create-nft.component';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss']
})
export class ThirdStepComponent implements OnInit {
  private readonly logger = new Logger(CreateCollectionComponent.name);

  @Input() public nftItemData: NFTItemData;
  @Output() private nextStep: EventEmitter<void> = new EventEmitter<void>();

  public form: FormGroup;
  public categories: NftCategoryDto[] = [];
  public uploadedFile: File;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly nftApiService: NftApiService,
    private readonly userInfoService: UserInfoService,
    private readonly fileUploadService: FileUploadService
  ) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      // Removed: count: [null, Validators.required],
      symbol: [null, Validators.required],
      type: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    const categories = await this.nftApiService.getCategories();
    this.categories = [NftCategoryDto.allCategory(true), ...categories];

    if (this.categories.length > 0) {
      const selectedCategory = this.categories[0];
      this.form.get('type')?.setValue(selectedCategory.name);
    }
  }

  public uploadFile(event: Event): void {
    const files = (<HTMLInputElement>event.target).files;
    if (!files || files.length === 0) {
      return;
    }

    this.uploadedFile = files[0];
  }

  public async createNFT(): Promise<void> {
    if (this.form.invalid) {
      return;
    }

    if (!this.uploadedFile) {
      return;
    }

    const userWallet = this.userInfoService.getUserWalletInfo();
    const walletAddress = userWallet?.account.address;
    if (!walletAddress) {
      return;
    }

    let nftItem: CreateNftItemResultDto | undefined = undefined;
    try {
      const uploadedFileUrl = await this.fileUploadService.uploadFile(this.uploadedFile);

      const formData: CreateNftItemDto = {
        type: this.form.get('type')?.value,
        media: this.uploadedFile.type,
        name: this.form.get('name')?.value,
        symbol: this.form.get('symbol')?.value,
        description: this.form.get('description')?.value,
        resourceUrl: uploadedFileUrl,
        previewUrl: uploadedFileUrl,
        createNew: false,
        contractId: this.nftItemData.contractId
      };

      nftItem = await this.nftApiService.createNftItem(walletAddress, formData);
    } catch (error) {
      this.logger.error(error);
    }

    if (!nftItem || !nftItem.identifier) {
      return;
    }

    this.router.navigate([`/card/${nftItem.identifier}`]);
  }
}
