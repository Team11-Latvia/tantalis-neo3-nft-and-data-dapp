import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { ChooseNFTRoutingModule } from './choose-nft-routing.module';
import { ChooseNFTComponent } from './choose-nft.component';

@NgModule({
  imports: [
    SharedModule,
    ChooseNFTRoutingModule
  ],
  declarations: [
    ChooseNFTComponent
  ],
  providers: [],
})
export class ChooseNFTModule { }
