import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface NFTItemData {
  method?: string;
  price?: number;
  interest?: number;
  contractId?: string;
}

@Component({
  selector: 'app-create-nft',
  templateUrl: './create-nft.component.html',
  styleUrls: ['./create-nft.component.scss']
})
export class CreateNftComponent implements OnInit {

  public currentStep = 1;
  public nftItemData: NFTItemData = {};

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router 
  ) { }

  ngOnInit(): void {
    const contractId = this.activatedRoute.snapshot.params.id;
    if (!contractId) {
      this.router.navigate(['profile']);
    }
    
    this.nftItemData.contractId = contractId;
  }

  public nextStep(): void {
    if (this.currentStep === 3) {
      return;
    }
    
    this.currentStep += 1;
  }

  public prevStep(): void {
    if (this.currentStep === 1) {
      return;
    }
    
    this.currentStep -= 1;
  }
}
