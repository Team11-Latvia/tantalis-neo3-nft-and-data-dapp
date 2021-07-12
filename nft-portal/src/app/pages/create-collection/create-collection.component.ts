import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Logger } from './../../shared/logger/logger';
import { FileUploadService } from './../../shared/services/file-upload/services/file.upload.service';
import { CreateNftItemDto } from './../../shared/services/nft/dto/create.nft.item.dto';
import { CreateNftItemResultDto } from './../../shared/services/nft/dto/create.nft.item.result.dto';
import { NftCategoryDto } from './../../shared/services/nft/dto/nft.category.dto';
import { NftApiService } from './../../shared/services/nft/nft.api.service';
import { UserInfoService } from './../../shared/services/user/user.info.service';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.scss']
})
export class CreateCollectionComponent implements OnInit {

  private readonly logger = new Logger(CreateCollectionComponent.name);

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

  public async createCollection(): Promise<void> {
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

    let collection: CreateNftItemResultDto | undefined = undefined;
    try {
      const uploadedFileUrl = await this.fileUploadService.uploadFile(this.uploadedFile);

      const formData: CreateNftItemDto = {
        type: this.form.get('type')?.value,
        media: this.uploadedFile.type,
        name: this.form.get('name')?.value,
        symbol: this.form.get('symbol')?.value,
        description: this.form.get('symbol')?.value,
        resourceUrl: uploadedFileUrl,
        previewUrl: uploadedFileUrl,
        createNew: true
      };

      collection = await this.nftApiService.createNftItem(walletAddress, formData);
    } catch (error) {
      this.logger.error(error);
    }

    if (!collection || !collection.identifier) {
      return;
    }

    this.router.navigate([`/create/${collection.identifier}`]);
  }
}
